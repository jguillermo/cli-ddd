import { storage } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../modules/load-data/domain/propertie/propertie';
import { Render } from '../render';
import { AbstractService } from './abstract-service';

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Response';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    this.renderAggregate(aggregate, properties);
    this.renderListAggregate(aggregate, properties);
  }

  private renderAggregate(aggregate: Aggregate, properties: Propertie[]) {
    const className = this.language.className([aggregate.name.value, 'Response']);
    const generateFile = this.language.classFile([aggregate.name.value, 'Response']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application']);

    Render.generate({
      templateFile: `${this.language.language()}/application/response/aggregate.ejs`,
      templateData: {
        aggregate,
        className,
        properties,
        strValueProperties: properties.map((e) => `${aggregate.name.propertie}.${e.name.value}.value`).join(', '),
        strVoProperties: properties.map((e) => `${e.name.value}: ${e.className}`).join(', '),
        strTypeProperties: properties.map((e) => `public ${e.name.value}: ${e.type.primitive}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderListAggregate(aggregate: Aggregate, properties: Propertie[]) {
    const aggregateResponse = this.language.className([aggregate.name.value, 'Response']);
    const className = this.language.className(['list', aggregate.name.value, 'Response']);
    const generateFile = this.language.classFile(['list', aggregate.name.value, 'Response']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application']);

    Render.generate({
      templateFile: `${this.language.language()}/application/response/list-aggregate.ejs`,
      templateData: {
        aggregateResponse,
        aggregate,
        className,
        properties,
        strValueProperties: properties.map((e) => `${aggregate.name.propertie}.${e.name.value}.value`).join(', '),
        strVoProperties: properties.map((e) => `${e.name.value}: ${e.className}`).join(', '),
        strTypeProperties: properties.map((e) => `public ${e.name.value}: ${e.type.primitive}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
