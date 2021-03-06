import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { storage, WPropertie } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Render } from '../../render';
import { PropertieTypes } from '../../../modules/load-data/domain/propertie/propertieType';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

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

    // this.renderTest(aggregate, properties, "delete");
    // this.renderTest(aggregate, properties, "findById");
    // this.renderTest(aggregate, properties, "list");
    // this.renderTest(aggregate, properties, "persist");

    this.renderFeature(aggregate, properties, 'delete');
    this.renderFeature(aggregate, properties, 'findById');
    this.renderFeature(aggregate, properties, 'list');
    this.renderFeature(aggregate, properties, 'persist');

    this.renderObjectMother(aggregate, properties);
    this.renderTestRepository(aggregate, properties);
    this.renderE2eModule(aggregate, properties);
  }

  private renderType(aggregate: Aggregate, properties: WPropertie[]) {
    const className = this.language.className([aggregate.name.value, 'type']);
    const generateFile = this.language.classFile([aggregate.name.value, 'type']);
    const generatefolder = this.folderPath(aggregate).appGraphQl;

    const enumProperties = properties.filter((e) => e.primitivePropertie.type.isEnum);

    Render.generate({
      templateFile: `${this.templatePath}/type.ejs`,
      templateData: {
        aggregate,
        className,
        properties,
        enumProperties,
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
    const { fileAggregate } = this.resources(aggregate);

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

    const classListAggregateResponse = this.language.className([aggregate.name.value, 'list', 'Response']);
    const fileListAggregateResponse = this.language.classFile([aggregate.name.value, 'list', 'Response'], false);

    const className = this.language.className([aggregate.name.value, 'Resolver']);
    const generateFile = this.language.classFile([aggregate.name.value, 'Resolver']);
    const generatefolder = this.folderPath(aggregate).appGraphQl;

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
        fileAggregate,
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
    const generatefolder = this.folderPath(aggregate).testInfrastructure;

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

  private renderFeature(aggregate: Aggregate, properties: WPropertie[], type: string) {
    const typeTest = this.language.className([type]);
    const typeFile = this.language.classFileTestWithOutType([type], false);

    const generateFile = this.language.classFileTestFeature([type]);
    const generatefolder = this.folderPath(aggregate).testFeatures;

    const resources = this.resources(aggregate);

    let graphQlService = `${resources.aggregatePropertie}${typeTest}`;
    if (typeTest === 'FindById') {
      graphQlService = `${resources.aggregatePropertie}`;
    }

    const propertiesValues = properties.map((p) => {
      let value: any = null;
      let valueUpdated: any = null;
      let completed = null;
      let completeUpdated = null;
      let valueFunction = null;
      let hasQuote = true;
      switch (p.propertie.type.value) {
        case PropertieTypes.ID: {
          value = resources.aggregatePropertieUUID;
          break;
        }
        case PropertieTypes.STRING: {
          value = s.capitalize(p.propertie.name.value);
          valueUpdated = s.capitalize(`${p.propertie.name.value}Update`);
          break;
        }
        case PropertieTypes.UUID: {
          value = resources.aggregateUUIDs[0];
          valueUpdated = resources.aggregateUUIDs[1];
          break;
        }
        case PropertieTypes.DATE: {
          value = '2018-03-23';
          completed = '2018-03-23T00:00:00.000Z';
          valueFunction = 'Date(2018-03-23)';
          valueUpdated = '2018-03-24';
          completeUpdated = '2018-03-24T00:00:00.000Z';
          break;
        }
        case PropertieTypes.ENUM: {
          const enumValues = p.primitivePropertie.type.isEnum ? p.primitivePropertie.metadataEnum.values : [''];
          value = enumValues[0];
          valueUpdated = enumValues[1];
          break;
        }
        case PropertieTypes.NUMBER: {
          value = 12;
          valueUpdated = 15;
          hasQuote = false;
          break;
        }
        case PropertieTypes.BOOLEAN: {
          value = true;
          valueUpdated = false;
          hasQuote = false;
          break;
        }
      }

      valueUpdated = valueUpdated === null ? value : valueUpdated;
      return {
        name: p.propertie.name.value,
        value,
        valueFunction: valueFunction === null ? value : valueFunction,
        completed: completed === null ? value : completed,
        valueUpdated,
        completeUpdated: completeUpdated === null ? valueUpdated : completeUpdated,
        hasQuote,
      };
    });

    properties[0].propertie.name.value;

    Render.generate({
      templateFile: `${this.language.language()}/test/feature/${typeFile}-feature.ejs`,
      templateData: {
        ...resources,
        graphQlService,
        properties,
        propertiesValues,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderE2eModule(aggregate: Aggregate, properties: WPropertie[]) {
    const generateFile = this.language.classFileWithOutType([aggregate.name.value, 'e2e', 'module']);
    const generatefolder = this.folderPath(aggregate).testInfrastructure;

    const testingInterface = this.language.className([aggregate.name.value, 'TestingInterface']);
    Render.generate({
      templateFile: `${this.language.language()}/test/persistence/e2e-module.ejs`,
      templateData: {
        testingInterface,
        properties,
        ...this.resources(aggregate),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderObjectMother(aggregate: Aggregate, properties: WPropertie[]) {
    const { classAggregate, fileObjectMother } = this.resources(aggregate);

    const generateFile = fileObjectMother + this.language.dotExt();
    const generatefolder = this.folderPath(aggregate, ['persistence']).testInfrastructure;

    const propertiesMother = properties.map((e) => {
      let faker = 'faker.random.word';
      if (e.primitivePropertie.type.value === PropertieTypes.ID || e.primitivePropertie.type.value === PropertieTypes.UUID) {
        faker = 'faker.datatype.uuid';
      }
      if (e.primitivePropertie.type.isDate) {
        faker = 'faker.datatype.datetime().toISOString';
      }
      if (e.primitivePropertie.type.isNumber) {
        faker = 'faker.datatype.number';
      }
      if (e.primitivePropertie.type.isBoolean) {
        faker = 'faker.datatype.boolean';
      }
      if (e.propertie.name.value === 'name') {
        faker = 'faker.name.firstName';
      }
      return {
        className: `${e.propertie.className}Mother`,
        classPropertie: e.propertie.className,
        primitive: e.primitivePropertie.type.primitive,
        propertie: e.propertie.name.value,
        isEnum: e.propertie.type.isEnum,
        faker,
      };
    });

    const dataInterface = `${classAggregate}DataInterface`;
    const propertiesMotherStr = propertiesMother.map((e) => `${e.className}.create(data?.${e.propertie})`).join(', ');
    Render.generate({
      templateFile: `${this.language.language()}/test/persistence/object-mother.ejs`,
      templateData: {
        dataInterface,
        properties,
        propertiesMother,
        propertiesMotherStr,
        ...this.resources(aggregate),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderTestRepository(aggregate: Aggregate, properties: WPropertie[]) {
    const generateFile = this.language.classFileTestWithOutType([aggregate.name.value, 'repository']);
    const generatefolder = this.folderPath(aggregate, ['persistence']).testInfrastructure;
    properties[0].propertie.name.value;
    Render.generate({
      templateFile: `${this.language.language()}/test/persistence/repository.ejs`,
      templateData: {
        ...this.resources(aggregate),
        properties,
      },
      generatefolder,
      generateFile,
    });
  }
}
