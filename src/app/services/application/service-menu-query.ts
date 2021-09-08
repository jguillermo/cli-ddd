import { storage, WPropertie } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Render } from '../../render';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { ServiceMenuApplicationIndexRender } from './service-menu-application-index';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class ServiceMenuQuery extends AbstractService {
  serviceName(): string {
    return 'Create Query';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);

    const answerTemplate = await inquirer.prompt(ServiceMenuQuery.questionTemplate());

    const answers = await inquirer.prompt(
      this.questions(
        aggregateName,
        properties.map((e) => e.name.fullName),
        answerTemplate.templateRender,
      ),
    );

    const render = new ServiceMenuQueryRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, { properties: answers.properties, queryName: answers.queryName, templateRender: answerTemplate.templateRender });
  }

  private static questionTemplate(): QuestionCollection<{ templateRender: string }> {
    return [
      {
        type: 'list',
        name: 'templateRender',
        message: `use template`,
        choices: ['findById', 'list', 'none'],
        default: 'none',
      },
    ];
  }

  private questions(aggregate: string, properties: string[], templateRender: string): QuestionCollection<{ queryName: string; properties: string[] }> {
    let defaultProperties = [...properties];
    let defaultQueryName = templateRender;
    if (templateRender === 'findById') {
      defaultProperties = properties.filter((e) => e.search(/:[Ii]{1}d$/g) >= 0);
    }
    if (templateRender === 'none') {
      defaultQueryName = null;
    }
    return [
      {
        type: 'input',
        name: 'queryName',
        message: `QUERY name`,
        default: defaultQueryName,
        validate(input: any): boolean | string | Promise<boolean | string> {
          if (s.trim(input).length < 3) {
            return 'QUERY name must be at least 3 letters.';
          }
          const regex = /^[a-zA-Z]{2,}$/g;
          if (!regex.test(input)) {
            return 'only caracters de a la a-z A-Z';
          }
          return true;
        },
      },
      {
        type: 'checkbox',
        name: 'properties',
        message: `${aggregate} properties`,
        choices: properties,
        default: defaultProperties,
      },
    ];
  }
}

export class ServiceMenuQueryRender extends AbstractServiceResponse {
  async execute(aggregateName: string, options: { properties: string[]; queryName: string; templateRender: string }): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);

    const propertiesSelected = storage.getWProperties(options.properties).map((e) => {
      e.setLanguage(this.language);
      return e;
    });
    const parentType = [...new Set(propertiesSelected.map((e) => e.parentTypeImp))].sort();

    this.renderDto(aggregate, propertiesSelected, options.queryName, options.templateRender, parentType);

    this.renderHandler(aggregate, propertiesSelected, options.queryName, options.templateRender, parentType);

    this.renderService(aggregate, propertiesSelected, options.queryName, options.templateRender, parentType);

    const renderIndex = new ServiceMenuApplicationIndexRender(this._collectionAggregate, this.language);
    await renderIndex.execute(aggregateName);
  }

  get templatePath(): string {
    return `${this.language.language()}/application/query`;
  }

  private renderDto(aggregate: Aggregate, properties: WPropertie[], queryName: string, templateRender: string, parentType: string[]) {
    const className = this.language.className([aggregate.name.value, queryName, 'Dto']);
    const generateFile = this.language.classFile([aggregate.name.value, queryName, 'Dto']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', queryName]);

    const propertiesDto = properties.map((e) => {
      let ePrimitive = e.primitive;

      if (e.primitivePropertie.type.isDate) {
        ePrimitive = `string`;
      }
      return {
        e,
        ePrimitive,
      };
    });

    Render.generate({
      templateFile: `${this.templatePath}/${templateRender}/dto.ejs`,
      templateData: {
        className,
        propertiesDto,
        properties,
        parentType,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderHandler(aggregate: Aggregate, properties: WPropertie[], queryName: string, templateRender: string, parentType: string[]) {
    const classDto = this.language.className([aggregate.name.value, queryName, 'Dto']);
    const fileDto = this.language.classFile([aggregate.name.value, queryName, 'Dto'], false);

    const classService = this.language.className([aggregate.name.value, queryName, 'service']);
    const fileService = this.language.classFile([aggregate.name.value, queryName, 'service'], false);

    const classResponse = this.language.className([aggregate.name.value, 'response']);
    const fileResponse = this.language.classFile([aggregate.name.value, 'response'], false);

    const classListResponse = this.language.className(['list', aggregate.name.value, 'response']);
    const fileListResponse = this.language.classFile(['list', aggregate.name.value, 'response'], false);

    const className = this.language.className([aggregate.name.value, queryName, 'handler']);
    const generateFile = this.language.classFile([aggregate.name.value, queryName, 'handler']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', queryName]);

    Render.generate({
      templateFile: `${this.templatePath}/${templateRender}/handler.ejs`,
      templateData: {
        classDto,
        fileDto,
        classService,
        fileService,
        classResponse,
        fileResponse,
        classListResponse,
        fileListResponse,
        className,
        properties,
        aggregate,
        parentType,
        strProperties: properties.map((e) => e.propertie.name.value).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderService(aggregate: Aggregate, properties: WPropertie[], queryName: string, templateRender: string, parentType: string[]) {
    const classRepository = this.language.className([aggregate.name.value, 'repository']);
    const fileRepository = this.language.classFile([aggregate.name.value, 'repository'], false);

    const classResponse = this.language.className([aggregate.name.value, 'response']);
    const fileResponse = this.language.classFile([aggregate.name.value, 'response'], false);

    const classListResponse = this.language.className(['list', aggregate.name.value, 'response']);
    const fileListResponse = this.language.classFile(['list', aggregate.name.value, 'response'], false);

    const className = this.language.className([aggregate.name.value, queryName, 'service']);
    const generateFile = this.language.classFile([aggregate.name.value, queryName, 'service']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', queryName]);

    Render.generate({
      templateFile: `${this.templatePath}/${templateRender}/service.ejs`,
      templateData: {
        classRepository,
        fileRepository,
        classResponse,
        fileResponse,
        classListResponse,
        fileListResponse,
        className,
        aggregate,
        properties,
        parentType,
        strProperties: properties.map((e) => e.propertie.name.value).join(', '),
        strVoProperties: properties.map((e) => `${e.propertie.name.value}: ${e.propertie.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
