import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { storage, WPropertie } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Render } from '../../render';

export class ServiceMenuGraphQl extends AbstractService {
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
    this.renderResolver(aggregate, properties);
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

  private getFileDto(aggregate: Aggregate, dto: string): string {
    return `${this.language.classFileWithOutType([dto], false)}/${this.language.classFile([aggregate.name.value, dto, 'Dto'], false)}`;
  }

  private renderResolver(aggregate: Aggregate, properties: WPropertie[]) {
    const classType = this.language.className([aggregate.name.value, 'type']);
    const fileType = this.language.classFile([aggregate.name.value, 'type'], false);

    const classFindByIdDto = this.language.className([aggregate.name.value, 'FindById', 'Dto']);
    const fileFindByIdDto = this.getFileDto(aggregate, 'FindById');

    const classPersistDto = this.language.className([aggregate.name.value, 'Persist', 'Dto']);
    const filePersistDto = this.getFileDto(aggregate, 'Persist');

    const classDeleteDto = this.language.className([aggregate.name.value, 'Delete', 'Dto']);
    const fileDeleteDto = this.getFileDto(aggregate, 'Delete');

    const classListDto = this.language.className([aggregate.name.value, 'List', 'Dto']);
    const fileListDto = this.getFileDto(aggregate, 'List');

    const classAggregateResponse = this.language.className([aggregate.name.value, 'Response']);
    const fileAggregateResponse = this.language.classFile([aggregate.name.value, 'Response'], false);

    const classListAggregateResponse = this.language.className(['list', aggregate.name.value, 'Response']);
    const fileListAggregateResponse = this.language.classFile(['list', aggregate.name.value, 'Response'], false);

    const className = this.language.className([aggregate.name.value, 'Resolver']);
    const generateFile = this.language.classFile([aggregate.name.value, 'Resolver']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'infrastructure', 'graphQl']);

    Render.generate({
      templateFile: `${this.templatePath}/resolver.ejs`,
      templateData: {
        classType,
        fileType,
        classFindByIdDto,
        fileFindByIdDto,
        classPersistDto,
        filePersistDto,
        classDeleteDto,
        fileDeleteDto,
        classListDto,
        fileListDto,
        classAggregateResponse,
        fileAggregateResponse,
        classListAggregateResponse,
        fileListAggregateResponse,
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
