import { AbstractService, AbstractServiceResponse } from './abstract-service';
import { storage, WPropertie } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Render } from '../render';

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create App GraphQl';
  }
  async execute(aggregateName: string): Promise<void> {
    const render = new ServiceRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}

export class ServiceRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/app/graph-ql`;
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    this.renderType(aggregate, properties);
  }

  private renderType(aggregate: Aggregate, properties: WPropertie[]) {
    const className = this.language.className([aggregate.name.value, 'type']);
    const generateFile = this.language.classFile([aggregate.name.value, 'type']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'infrastructure', 'graphQl']);

    Render.generate({
      templateFile: `${this.templatePath}/type.ejs`,
      templateData: {
        aggregate,
        className,
        properties,
        classResultPersist: `Result${aggregate.name.value}Persist`,
      },
      generatefolder,
      generateFile,
    });
  }
}
