import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';
import { AbstractService } from '../services/abstract-service';

export class GeneralMenuServices {
  async execute(aggregate: string, services: AbstractService[]): Promise<string> {
    const answerMenuCreate = await inquirer.prompt(GeneralMenuServices.questionMenuCreate(aggregate, services));
    return answerMenuCreate.menuSelected;
  }

  private static questionMenuCreate(aggregate: string, services: AbstractService[]): QuestionCollection<{ menuSelected: string }> {
    return [
      {
        type: 'rawlist',
        name: 'menuSelected',
        message: `What do you want to generate in ${aggregate}?`,
        choices: services.map((e) => e.serviceName()),
        pageSize: services.length + 2,
      },
    ];
  }
}
