import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';
import { storage } from '../in-memory-storage';
import { AbstractService } from '../services/abstract-service';

export class MenuServices {
  async execute(aggregate: string): Promise<string> {
    const answerMenuCreate = await inquirer.prompt(MenuServices.questionMenuCreate(aggregate));
    return answerMenuCreate.menuSelected;
  }

  private static questionMenuCreate(aggregate: string): QuestionCollection<{ menuSelected: string }> {
    return [
      {
        type: 'rawlist',
        name: 'menuSelected',
        message: `What do you want to generate in ${aggregate}?`,
        choices: MenuServices.loadListServices().map((e) => e.serviceName()),
        //pageSize: listMenu.length + 2,
      },
    ];
  }

  public static loadListServices(): AbstractService[] {
    return storage.get('services');
  }
}
