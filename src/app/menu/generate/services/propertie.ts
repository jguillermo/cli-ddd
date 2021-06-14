import { CollectionAggregate } from '../../../../modules/load-data/domain/CollectionAggregate';
import { GenerateInterface } from '../generate-Interface';
import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';
import { storage } from '../../../in-memory-storage';
import { CreatePropertie } from '../../../render/services/create-propertie';

export class Propertie implements GenerateInterface {
  constructor(private createPropertie: CreatePropertie) {}

  async execute(aggregate: string, collectionAggregate: CollectionAggregate): Promise<void> {
    const properties = storage.getProperties(collectionAggregate.getAggregate(aggregate).propertiesNames);

    const answers = await inquirer.prompt(
      this.questions(
        aggregate,
        properties.map((e) => e.name.fullName),
      ),
    );

    await this.createPropertie.execute(answers.properties, aggregate, collectionAggregate);
  }

  private questions(aggregate: string, properties: string[]): QuestionCollection<{ properties: string[] }> {
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
}
