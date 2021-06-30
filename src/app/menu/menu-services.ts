import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';
import { storage } from '../in-memory-storage';
import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';

export interface GenerateInterface {
  serviceName(): string;

  execute(aggregate: string, collectionAggregate: CollectionAggregate): void | Promise<void>;
}

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

  public static loadListServices(): GenerateInterface[] {
    return storage.get('services');
  }
}
