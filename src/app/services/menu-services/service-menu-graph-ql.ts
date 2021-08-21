import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { storage, WPropertie } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Render } from '../../render';
import { PropertieTypes } from '../../../modules/load-data/domain/propertie/propertieType';

export class ServiceMenuGraphQl extends AbstractService {
  serviceName(): string {
    return 'Create App GraphQl';
  }

  async execute(aggregateName: string): Promise<void> {
    const render = new ServiceMenuGraphQlRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}

export class ServiceMenuGraphQlRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/infrastructure/graph-ql`;
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames).map((e) => {
      e.setLanguage(this.language);
      return e;
    });
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    this.renderType(aggregate, properties);
    this.renderResolver(aggregate, properties);
    this.renderTest(aggregate, properties, 'delete');
    this.renderTest(aggregate, properties, 'findById');
    this.renderTest(aggregate, properties, 'list');
    this.renderTest(aggregate, properties, 'persist');
    this.renderObjectMother(aggregate, properties);
    this.renderE2eModule(aggregate, properties);
  }

  private renderType(aggregate: Aggregate, properties: WPropertie[]) {
    const className = this.language.className([aggregate.name.value, 'type']);
    const generateFile = this.language.classFile([aggregate.name.value, 'type']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'infrastructure', 'graphQl']);
    let firstPropertie = '';
    if (properties.length > 0) {
      firstPropertie = properties[0].propertie.name.value;
    }

    Render.generate({
      templateFile: `${this.templatePath}/type.ejs`,
      templateData: {
        aggregate,
        className,
        properties,
        firstPropertie,
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

  private renderTest(aggregate: Aggregate, properties: WPropertie[], type: string) {
    const typeTest = this.language.className([type]);
    const typeFile = this.language.classFileTestWithOutType([type], false);

    const classMother = this.language.className([aggregate.name.value, 'Mother']);

    const classRepository = this.language.className([aggregate.name.value, 'Repository']);
    const fileRepository = this.language.classFile([aggregate.name.value, 'Repository'], false);

    const generateFile = this.language.classFileTestWithOutType([aggregate.name.value, type]);
    const generatefolder = this.language.folderPath([aggregate.pathTest.value, 'graphQl']);

    const aggregatePropertie = aggregate.name.propertie;
    const aggregatePropertieDb = `${aggregatePropertie}Db`;
    const aggregatePropertieId = `${aggregatePropertie}.id`;
    const aggregatePropertieRepository = `${aggregatePropertie}Repository`;

    let graphQlService = `${aggregatePropertie}${typeTest}`;
    if (typeTest === 'FindById') {
      graphQlService = `${aggregatePropertie}`;
    }

    properties[0].propertie.name.value;

    Render.generate({
      templateFile: `${this.language.language()}/test/graph-ql/${typeFile}.ejs`,
      templateData: {
        aggregatePropertieRepository,
        aggregatePropertieId,
        aggregatePropertieDb,
        graphQlService,
        aggregatePropertie,
        classMother,
        classRepository,
        fileRepository,
        aggregate,
        properties,
        classResultPersist: `Result${aggregate.name.value}Persist`,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderE2eModule(aggregate: Aggregate, properties: WPropertie[]) {
    const aggregateName = this.language.className([aggregate.name.value]);
    const aggregateFile = this.language.classFileWithOutType([aggregate.name.value], false);

    const classRepository = this.language.className([aggregate.name.value, 'Repository']);
    const fileRepository = this.language.classFile([aggregate.name.value, 'Repository'], false);

    const className = this.language.className([aggregate.name.value, 'E2eModule']);

    const generateFile = this.language.classFileWithOutType([aggregate.name.value, 'e2e', 'module']);
    const generatefolder = this.language.folderPath([aggregate.pathTest.value, 'graphQl']);

    const dataInterface = `${aggregateName}DataInterface`;
    const aggregatePropertie = aggregate.name.propertie;
    const aggregatePropertieRepository = `${aggregatePropertie}Repository`;
    const testingInterface = this.language.className([aggregate.name.value, 'TestingInterface']);

    Render.generate({
      templateFile: `${this.language.language()}/test/graph-ql/e2e-module.ejs`,
      templateData: {
        testingInterface,
        classRepository,
        fileRepository,
        aggregatePropertieRepository,
        className,
        dataInterface,
        aggregatePropertie,
        aggregateName,
        aggregateFile,
        aggregate,
        properties,
        classResultPersist: `Result${aggregate.name.value}Persist`,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderObjectMother(aggregate: Aggregate, properties: WPropertie[]) {
    const aggregateName = this.language.className([aggregate.name.value]);
    const aggregateFile = this.language.classFileWithOutType([aggregate.name.value], false);

    const className = this.language.className([aggregate.name.value, 'mother']);

    const generateFile = this.language.classFileWithOutType([aggregate.name.value, 'object', 'mother']);
    const generatefolder = this.language.folderPath([aggregate.pathTest.value]);

    const dataInterface = `${aggregateName}DataInterface`;
    const aggregatePropertie = aggregate.name.propertie;

    const propertiesMother = properties.map((e) => {
      let faker = 'faker.random.word';
      if (e.primitivePropertie.type.value === PropertieTypes.ID || e.primitivePropertie.type.value === PropertieTypes.UUID) {
        faker = 'faker.datatype.uuid';
      }
      if (e.propertie.name.value === 'name') {
        faker = 'faker.name.firstName';
      }
      return {
        className: `${e.propertie.className}Mother`,
        classPropertie: e.propertie.className,
        primitive: e.primitivePropertie.type.primitive,
        propertie: e.propertie.name.value,
        faker,
      };
    });

    Render.generate({
      templateFile: `${this.language.language()}/test/object-mother.ejs`,
      templateData: {
        className,
        dataInterface,
        aggregatePropertie,
        aggregateName,
        aggregateFile,
        aggregate,
        properties,
        propertiesMother,
        propertiesMotherStr: propertiesMother.map((e) => `${e.className}.create(data?.${e.propertie})`).join(', '),
        classResultPersist: `Result${aggregate.name.value}Persist`,
      },
      generatefolder,
      generateFile,
    });
  }
}
