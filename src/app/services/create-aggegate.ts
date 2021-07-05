import { storage } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../modules/load-data/domain/propertie/propertie';
import { Render } from '../render';
import { AbstractService } from './abstract-service';

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Aggregate';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    this.renderAggregate(aggregate, properties);
  }

  private renderAggregate(aggregate: Aggregate, properties: Propertie[]) {
    const className = this.language.className([aggregate.name.value]);
    const generateFile = this.language.classFileWithOutType([aggregate.name.value]);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'domain']);

    Render.generate({
      templateFile: `${this.language.language()}/domain/aggregate.ejs`,
      templateData: {
        className,
        properties,
        strProperties: properties.map((e) => e.name.value).join(', '),
        strVoProperties: properties.map((e) => `${e.name.value}: ${e.className}`).join(', '),
        strVoUndescoreProperties: properties.map((e) => `private _${e.name.value}: ${e.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
