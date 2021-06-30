import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';
import { Service as CommandService } from '../services/create-command';
import { Service as PropertieService } from '../services/create-propertie';

export class MenuAggregate {
  async execute(aggregate: string): Promise<string> {
    const answerMenuCreate = await inquirer.prompt(this.questionMenuCreate(aggregate));
    return answerMenuCreate.menuSelected;
  }

  private questionMenuCreate(aggregate: string): QuestionCollection<{ menuSelected: string }> {
    return [
      {
        type: 'rawlist',
        name: 'menuSelected',
        message: `What do you want to generate in ${aggregate}?`,
        choices: this.loadListServices().map((e) => e.serviceName()),
        //pageSize: listMenu.length + 2,
      },
    ];
  }

  private loadListServices() {
    return [new CommandService(), new PropertieService()];
  }
}
