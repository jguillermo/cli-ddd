import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Render } from '../render';
import { storage } from '../in-memory-storage';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { Propertie } from '../../modules/load-data/domain/propertie/propertie';
import { AbstractService } from './abstract-service';

export class Service extends AbstractService {
  serviceName(): string {
    return 'Generate Propertie';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);

    const answers = await inquirer.prompt(
      Service.questions(
        aggregateName,
        properties.map((e) => e.name.fullName),
      ),
    );

    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    storage.getProperties(answers.properties).map((propertie) => {
      this.renderPropertie(aggregate, propertie);
    });
  }

  private static questions(aggregate: string, properties: string[]): QuestionCollection<{ properties: string[] }> {
    return [
      {
        type: 'checkbox',
        name: 'properties',
        message: `${aggregate} properties`,
        choices: properties,
        default: properties,
      },
    ];
  }

  private renderPropertie(aggregate: Aggregate, propertie: Propertie) {
    const className = this.language.className([propertie.className]);
    const generateFile = this.language.classFileWithOutType([propertie.className]);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'domain']);

    Render.generate({
      templateFile: `${this.language.language()}/domain/types/${propertie.type.value}-type.ejs`,
      templateData: {
        className,
        aggregate,
      },
      generatefolder,
      generateFile,
    });
  }
}
