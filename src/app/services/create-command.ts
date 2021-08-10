import { storage } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../modules/load-data/domain/propertie/propertie';
import { Render } from '../render';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { AbstractService } from './abstract-service';
import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';
import { LanguageInterface } from '../languages/language';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Command';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);

    const answerTemplate = await inquirer.prompt(Service.questionTemplate());

    const answers = await inquirer.prompt(
      this.questions(
        aggregateName,
        properties.map((e) => e.name.fullName),
        answerTemplate.templateRender,
      ),
    );

    const render = new ServiceCreateCommand(this._collectionAggregate, this.language);
    await render.execute(aggregateName, answers.properties, answers.commandName, answerTemplate.templateRender);
  }

  private static questionTemplate(): QuestionCollection<{ templateRender: string }> {
    return [
      {
        type: 'list',
        name: 'templateRender',
        message: `use template`,
        choices: ['persist', 'delete', 'none'],
        default: 'none',
      },
    ];
  }

  private questions(
    aggregate: string,
    properties: string[],
    templateRender: string,
  ): QuestionCollection<{ properties: string[]; commandName: string }> {
    let defaultProperties = [...properties];
    if (templateRender === 'delete') {
      defaultProperties = properties.filter((e) => e.search(/:[Ii]{1}d$/g) >= 0);
    }
    return [
      {
        type: 'input',
        name: 'commandName',
        message: `COMMAND name`,
        default: templateRender,
        validate(input: any): boolean | string | Promise<boolean | string> {
          if (s.trim(input).length < 3) {
            return 'COMMAND name must be at least 3 letters.';
          }
          const regex = /^[a-zA-Z]{2,}$/g;
          if (!regex.test(input)) {
            return 'only caracters de a la a-z A-Z';
          }
          return true;
        },
      },
      {
        type: 'checkbox',
        name: 'properties',
        message: `${aggregate} properties`,
        choices: properties,
        default: defaultProperties,
      },
    ];
  }
}

export class ServiceCreateCommand {
  constructor(private _collectionAggregate: CollectionAggregate, private language: LanguageInterface) {}

  async execute(
    aggregateName: string,
    properties: string[],
    commandName: string,
    templateRender: string,
  ): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const propertiesSelected = storage.getProperties(properties);

    this.renderService(aggregate, propertiesSelected, commandName, templateRender);

    this.renderCommand(aggregate, propertiesSelected, commandName);

    this.renderHandler(aggregate, propertiesSelected, commandName);
  }

  get templatePath(): string {
    return `${this.language.language()}/application/command/`;
  }

  private renderCommand(aggregate: Aggregate, properties: Propertie[], commandName: string) {
    const classInput = this.language.className([aggregate.name.value, commandName, 'Input']);
    const className = this.language.className([aggregate.name.value, commandName, 'Command']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'Command']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${this.templatePath}command.ejs`,
      templateData: {
        classInput,
        className,
        properties,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderService(aggregate: Aggregate, properties: Propertie[], commandName: string, templateRender: string) {
    const className = this.language.className([aggregate.name.value, commandName, 'service']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'service']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${this.templatePath}service.ejs`,
      templateData: {
        templateRender,
        className,
        aggregate,
        strProperties: properties.map((e) => e.name.value).join(', '),
        strVoProperties: properties.map((e) => `${e.name.value}: ${e.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderHandler(aggregate: Aggregate, properties: Propertie[], commandName: string) {
    const classCommand = this.language.className([aggregate.name.value, commandName, 'command']);
    const classService = this.language.className([aggregate.name.value, commandName, 'service']);
    const className = this.language.className([aggregate.name.value, commandName, 'handler']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'handler']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${this.templatePath}handler.ejs`,
      templateData: {
        classCommand,
        classService,
        className,
        properties,
        strProperties: properties.map((e) => e.name.value).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
