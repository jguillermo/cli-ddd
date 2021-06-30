import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';
import { Language, LanguageInterface } from '../languages/language';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Render } from '../render';
import { storage } from '../in-memory-storage';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { Propertie } from '../../modules/load-data/domain/propertie/propertie';
import { GenerateInterface } from '../menu/menu-services';

export class Service implements GenerateInterface {
  serviceName(): string {
    return 'Generate Propertie';
  }

  async execute(aggregate: string, collectionAggregate: CollectionAggregate): Promise<void> {
    const properties = storage.getProperties(collectionAggregate.getAggregate(aggregate).propertiesNames);

    const answers = await inquirer.prompt(
      Service.questions(
        aggregate,
        properties.map((e) => e.name.fullName),
      ),
    );

    await this.executeService(answers.properties, aggregate, collectionAggregate);
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

  async executeService(properties: string[], aggregateName: string, collectionAggregate: CollectionAggregate) {
    const aggregate = collectionAggregate.getAggregate(aggregateName);
    const service = Language.plugin('node');

    storage.getProperties(properties).map((propertie) => {
      Service.renderPropertie(aggregate, service, propertie);
    });
  }

  private static renderPropertie(aggregate: Aggregate, service: LanguageInterface, propertie: Propertie) {
    const className = service.className([propertie.className]);
    const generateFile = service.classFileWithOutType([propertie.className]);
    const generatefolder = service.folderPath([aggregate.path.value, 'domain']);

    Render.generate({
      templateFile: `${service.language()}/domain/types/${propertie.type.value}-type.ejs`,
      templateData: {
        className,
        aggregate,
      },
      generatefolder,
      generateFile,
    });
  }
}
