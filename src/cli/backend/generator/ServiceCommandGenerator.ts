import * as inquirer from 'inquirer';
import {questionCreateServiceCommand} from "../questions";
import {CommnadService} from "../../../sdk/codeMain/application/CommandService";
import {AbstractBackEndGenerator, BackEndGeneratorConstructor} from "./AbstractBackEndGenerator";


export class ServiceCommandGenerator extends AbstractBackEndGenerator {
    constructor(params: BackEndGeneratorConstructor) {
        super(params);
    }

    async generate(): Promise<void> {
        const answers = await inquirer.prompt(questionCreateServiceCommand(this.config.properties));
        const command = new CommnadService(this.data, answers.serviceName, answers.properties, answers.templateService);
        this.renderTemplate(command.template);
    }
}

