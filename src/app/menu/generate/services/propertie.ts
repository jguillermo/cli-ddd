import { CollectionAggregate } from '../../../../modules/load-data/domain/CollectionAggregate';
import { QuestionCollection } from 'inquirer';
import * as inquirer from 'inquirer';
import { storage } from '../../../in-memory-storage';
import { CreatePropertie } from '../../../render/services/create-propertie';
import { GenerateInterface } from '../generate';

export class Propertie implements GenerateInterface {
  serviceName(): string {
    return '';
  }
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
