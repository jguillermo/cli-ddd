import * as inquirer from 'inquirer';

import {downloadConfigFolder, generateFile, itemsFolder, logTemplate, readYaml} from "./Util";
import path from "path";
import {CommnadService} from "../sdk/codeMain/application/CommandService";
import * as fs from "fs";
import {QueryService} from "../sdk/codeMain/application/QueryService";
import {Aggregate} from "../sdk/codeMain/domain/Aggregate";
import {ValueObject} from "../sdk/codeMain/domain/ValueObject";
import {ValueObjectMother} from "../sdk/codeTest/domain/ValueObjectMother";
import {Event} from "../sdk/codeMain/domain/Event";
import {Repository} from "../sdk/codeMain/domain/Repository";
import {Dao} from "../sdk/codeMain/infrastructure/persistence/Dao";
import {JpaRepository} from "../sdk/codeMain/infrastructure/persistence/JpaRepository";
import {SqlRepository} from "../sdk/codeMain/infrastructure/persistence/SqlRepository";
import {EntityResponse} from "../sdk/codeMain/application/EntityResponse";
import {Config} from "../sdk/config/Config";


export class CliDdd {
    // @ts-ignore
    private _config: Config;
    private _pathFile: string = "";
    public loop: boolean = true;

    constructor(private _relativePath: string, private _pathTemplates: string) {

    }

    private get pathConfig() {
        return path.join(this._relativePath, 'lclcli', 'config');
    }

    private get data() {
        return readYaml(this._pathFile);
    }

    private exit() {
        this.loop = false;
    }

    async menu() {
        const answers = await inquirer.prompt<{ menu: string }>([
            {
                type: 'rawlist',
                name: 'menu',
                message: `What do you want to do in ${this._config.entity}?`,
                choices: [
                    'Create Service Command',
                    'Create Service Query',
                    'Create Event',
                    'Generate Core',
                    'Select file',
                    'Exit'
                ]
            }
        ]);
        await this.factoryService(answers.menu);
    }

    private async factoryService(service: string) {
        switch (service) {
            case 'Create Service Command':
                await this.createServiceCommand();
                break;
            case 'Create Service Query':
                await this.createServiceQuery()
                break;
            case 'Create Event':
                await this.createEvent();
                break;
            case 'Generate Core':
                await this.generateCore();
                break;
            case 'Select file':
                this._pathFile = "";
                break;
            case 'Exit':
                this.exit();
                break;
        }
    }

    private async createServiceCommand() {

        const answers = await inquirer.prompt<{ serviceName: string, properties: string[], templateService: string }>([
            {
                type: 'input',
                name: 'serviceName',
                message: `Nombre del servicio de applicacion COMMAND`
            }, {
                type: 'checkbox',
                name: 'properties',
                message: `Properties`,
                choices: this._config.properties
            }, {
                type: 'list',
                name: 'templateService',
                message: `alguna plantilla a usar`,
                choices: ['create', 'update', 'delete', 'none'],
                default: "none"
            },
        ]);
        const command = new CommnadService(this.data, answers.serviceName, answers.properties, answers.templateService);
        logTemplate(command.template);
        generateFile(command.template, this._relativePath, this._pathTemplates);
        this.exit();
    }

    private async createServiceQuery() {

        const answers = await inquirer.prompt<{ serviceName: string, properties: string[], returnType: string, templateService: string }>([
            {
                type: 'input',
                name: 'serviceName',
                message: `Nombre del servicio de applicacion QUERY`
            }, {
                type: 'checkbox',
                name: 'properties',
                message: `Properties`,
                choices: this._config.properties
            }, {
                type: 'list',
                name: 'returnType',
                message: `retorna un objeto o una lista?`,
                choices: ['entity', 'list'],
                default: "entity"
            }, {
                type: 'list',
                name: 'templateService',
                message: `alguna plantilla a usar`,
                choices: ['findById', 'searchCriteria', 'none'],
                default: "none"
            },
        ]);
        const query = new QueryService(this.data, answers.serviceName, answers.returnType, answers.properties, answers.templateService);
        logTemplate(query.template);
        generateFile(query.template, this._relativePath, this._pathTemplates);
        this.exit();
    }

    private async createEvent() {

        const answersAction = await inquirer.prompt<{ eventAction: string }>([
            {
                type: 'input',
                name: 'eventAction',
                message: `Nombre del evento, ejm: created, updated, deleted`
            }
        ]);

        const answers = await inquirer.prompt<{ eventName: string, properties: string[] }>([
            {
                type: 'input',
                name: 'eventName',
                message: `Nombre para enviar a los demas ms`,
                default: `${this._config.entityClassPropertie}.${answersAction.eventAction}`
            }, {
                type: 'checkbox',
                name: 'properties',
                message: `Properties`,
                choices: this._config.properties.filter(propertie => propertie !== 'id')
            }
        ]);

        const event = new Event(this.data, answersAction.eventAction, answers.eventName, answers.properties);
        logTemplate(event.template, true);
        generateFile(event.template, this._relativePath, this._pathTemplates);
        this.exit();
    }

    private async generateCore() {
        let answers = {core: ['Aggregate', 'ValueObject', 'Repository', 'QueryResponse']};
        const answersConfirm = await inquirer.prompt<{ generateAll: boolean }>([
            {
                type: 'confirm',
                name: 'generateAll',
                message: `Desea generar todo?`,
                default: true
            },
        ]);

        if (!answersConfirm.generateAll) {
            answers = await inquirer.prompt<{ core: string[] }>([
                {
                    type: 'checkbox',
                    name: 'core',
                    message: `Selecciona que modelos CORE se va a generar`,
                    choices: ['Aggregate', 'ValueObject', 'Repository', 'QueryResponse']
                }
            ]);
        }


        if (answers.core.includes('Aggregate')) {
            const aggregate = new Aggregate(this.data);
            logTemplate(aggregate.template);
            generateFile(aggregate.template, this._relativePath, this._pathTemplates);

            // por defecto se agrega un evento de create al agregate con todas las propiedades
            const event = new Event(this.data, 'created', `${this._config.entityClassPropertie}.created`);
            generateFile(event.template, this._relativePath, this._pathTemplates);
        }
        if (answers.core.includes('ValueObject')) {
            const valueObject = new ValueObject(this.data);
            const valueObjectMother = new ValueObjectMother(this.data);
            logTemplate(valueObject.template);
            generateFile(valueObject.template, this._relativePath, this._pathTemplates);

            logTemplate(valueObjectMother.template);
            generateFile(valueObjectMother.template, this._relativePath, this._pathTemplates);
        }


        if (answers.core.includes('Repository')) {
            const repository = new Repository(this.data);
            const dao = new Dao(this.data);
            const jpaRepository = new JpaRepository(this.data);
            const sqlRepository = new SqlRepository(this.data);

            logTemplate(repository.template);
            generateFile(repository.template, this._relativePath, this._pathTemplates);

            logTemplate(dao.template);
            generateFile(dao.template, this._relativePath, this._pathTemplates);

            logTemplate(jpaRepository.template);
            generateFile(jpaRepository.template, this._relativePath, this._pathTemplates);

            logTemplate(sqlRepository.template);
            generateFile(sqlRepository.template, this._relativePath, this._pathTemplates);
        }
        if (answers.core.includes('QueryResponse')) {
            const entityResponse = new EntityResponse(this.data);
            logTemplate(entityResponse.template);
            generateFile(entityResponse.template, this._relativePath, this._pathTemplates);
        }

        this.exit();
    }

    async selectFile(listFile: string[]) {
        if (this._pathFile !== "") {
            return;
        }
        if (listFile.length === 0) {
            throw new Error("No existen archivos de configuracion");
        }
        if (listFile.length === 1) {
            this._pathFile = path.join(this.pathConfig, listFile[0]);
        } else {
            const answers = await inquirer.prompt<{ file: string }>([
                {
                    type: 'list',
                    name: 'file',
                    message: `Selecciona el archivo de configuración`,
                    choices: listFile
                },
            ]);
            this._pathFile = path.join(this.pathConfig, answers.file);
        }

        this._config = new Config(this.data);
    }

    async itemsFolderConfig(): Promise<string[]> {

        if (fs.existsSync(this.pathConfig)) {
            return itemsFolder(this.pathConfig);
        }

        const answers = await inquirer.prompt<{ downloadFolder: boolean }>([
            {
                type: 'confirm',
                name: 'downloadFolder',
                message: `Desea descargar el archivo de configuracion?`,
                default: true
            },
        ]);
        if (!answers.downloadFolder) {
            this.exit();
            return [];
        }
        await downloadConfigFolder(this._relativePath, this._pathTemplates);
        return itemsFolder(this.pathConfig);
    }

}

