import { storage, WPropertie } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Render } from '../render';
import { AbstractService } from './abstract-service';
import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';
import { LanguageInterface } from '../languages/language';

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Response';
  }

  async execute(aggregateName: string): Promise<void> {
    const render = new ServiceRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}

export class ServiceRender {
  constructor(private _collectionAggregate: CollectionAggregate, private language: LanguageInterface) {}

  get templatePath(): string {
    return `${this.language.language()}/application/response`;
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    this.renderAggregate(aggregate, properties);
    this.renderListAggregate(aggregate);
  }

  private renderAggregate(aggregate: Aggregate, properties: WPropertie[]) {
    const className = this.language.className([aggregate.name.value, 'Response']);
    const generateFile = this.language.classFile([aggregate.name.value, 'Response']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application']);

    Render.generate({
      templateFile: `${this.templatePath}/aggregate.ejs`,
      templateData: {
        aggregate,
        className,
        strValueProperties: properties.map((e) => `${aggregate.name.propertie}.${e.propertie.name.value}.value`).join(', '),
        strTypeProperties: properties.map((e) => `public ${e.propertie.name.value}: ${e.primitive}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderListAggregate(aggregate: Aggregate) {
    const classAggregateResponse = this.language.className([aggregate.name.value, 'Response']);
    const fileAggregateResponse = this.language.classFile([aggregate.name.value, 'Response'], false);

    const className = this.language.className(['list', aggregate.name.value, 'Response']);
    const generateFile = this.language.classFile(['list', aggregate.name.value, 'Response']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application']);

    Render.generate({
      templateFile: `${this.templatePath}/list-aggregate.ejs`,
      templateData: {
        classAggregateResponse,
        fileAggregateResponse,
        className,
      },
      generatefolder,
      generateFile,
    });
  }
}
