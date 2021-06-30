import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';
import { GenerateType } from './generate/generate';

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
        choices: MenuAggregate.getListMenu(),
        //pageSize: listMenu.length + 2,
      },
    ];
  }

  private static getListMenu(): string[] {
    return [
      GenerateType.CREATE_SERVICE_COMMAND,
      GenerateType.CREATE_SERVICE_QUERY,
      GenerateType.CREATE_EVENT,
      GenerateType.GENERATE_CORE,
      GenerateType.GENERATE_PROPERTIE,
    ];
  }
}
