import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';
import { storage } from '../in-memory-storage';

export class MenuAggregate {
  async execute(aggregate: string): Promise<string> {
    const answerMenuCreate = await inquirer.prompt(MenuAggregate.questionMenuCreate(aggregate));
    return answerMenuCreate.menuSelected;
  }

  private static questionMenuCreate(aggregate: string): QuestionCollection<{ menuSelected: string }> {
    return [
      {
        type: 'rawlist',
        name: 'menuSelected',
        message: `What do you want to generate in ${aggregate}?`,
        choices: MenuAggregate.loadListServices().map((e) => e.serviceName()),
        //pageSize: listMenu.length + 2,
      },
    ];
  }

  private static loadListServices() {
    return storage.get('services');
  }
}
