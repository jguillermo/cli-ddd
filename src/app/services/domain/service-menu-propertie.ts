import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Render } from '../../render';
import { storage, WPropertie } from '../../in-memory-storage';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { AbstractService, AbstractServiceResponse } from '../abstract-service';

export class ServiceMenuPropertie extends AbstractService {
  serviceName(): string {
    return 'Generate Properties';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);
    const answers = await inquirer.prompt(
      ServiceMenuPropertie.questions(
        aggregateName,
        properties.map((e) => e.name.fullName),
      ),
    );
    const render = new ServiceMenuPropertieRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, { properties: answers.properties });
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
}

export class ServiceMenuPropertieRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/domain/types`;
  }

  async execute(aggregateName: string, options: { properties: string[] }): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const propertiesSelected = storage.getWProperties(options.properties).map((e) => {
      e.setLanguage(this.language);
      return e;
    });
    propertiesSelected.map((wpropertie) => {
      this.renderPropertie(aggregate, wpropertie);
    });
  }

  private renderPropertie(aggregate: Aggregate, propertie: WPropertie) {
    const className = this.language.className([propertie.propertie.className]);
    const generateFile = this.language.classFileWithOutType([propertie.propertie.className]);
    const generatefolder = this.folderPath(aggregate).domain;

    const enumValues = propertie.primitivePropertie.type.isEnum ? propertie.primitivePropertie.metadataEnum.values : [];

    Render.generate({
      templateFile: `${this.templatePath}/${propertie.primitiveType}-type.ejs`,
      templateData: {
        className,
        propertie,
        enumValues,
      },
      generatefolder,
      generateFile,
    });
  }
}
