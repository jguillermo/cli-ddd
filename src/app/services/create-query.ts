import { storage, WPropertie } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../modules/load-data/domain/propertie/propertie';
import { Render } from '../render';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { AbstractService } from './abstract-service';
import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';
import { LanguageInterface } from '../languages/language';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Query';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);

    const answerTemplate = await inquirer.prompt(Service.questionTemplate());

    const answers = await inquirer.prompt(
      this.questions(
        aggregateName,
        properties.map((e) => e.name.fullName),
        answerTemplate.templateRender,
      ),
    );

    const render = new ServiceCreateQuery(this._collectionAggregate, this.language);
    await render.execute(aggregateName, answers.properties, answers.queryName, answerTemplate.templateRender);
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

export class ServiceCreateQuery {
  constructor(private _collectionAggregate: CollectionAggregate, private language: LanguageInterface) {}

  async execute(aggregateName: string, properties: string[], queryName: string, templateRender: string): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);

    const propertiesSelected = storage.getWProperties(properties).map((e) => {
      e.setLanguage(this.language);
      return e;
    });

    this.renderDto(aggregate, propertiesSelected, queryName);

    this.renderHandler(aggregate, propertiesSelected, queryName);

    this.renderService(aggregate, propertiesSelected, queryName, templateRender);
  }

  get templatePath(): string {
    return `${this.language.language()}/application/query/`;
  }

  private renderDto(aggregate: Aggregate, properties: WPropertie[], queryName: string) {
    const className = this.language.className([aggregate.name.value, queryName, 'Dto']);
    const generateFile = this.language.classFile([aggregate.name.value, queryName, 'Dto']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', queryName]);

    Render.generate({
      templateFile: `${this.templatePath}dto.ejs`,
      templateData: {
        className,
        properties,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderHandler(aggregate: Aggregate, properties: WPropertie[], queryName: string) {
    const classDto = this.language.className([aggregate.name.value, queryName, 'Dto']);
    const fileDto = this.language.classFile([aggregate.name.value, queryName, 'Dto'], false);

    const classService = this.language.className([aggregate.name.value, queryName, 'service']);
    const fileService = this.language.classFile([aggregate.name.value, queryName, 'service'], false);

    const classResponse = this.language.className([aggregate.name.value, 'response']);
    const fileResponse = this.language.classFile([aggregate.name.value, 'response'], false);

    const className = this.language.className([aggregate.name.value, queryName, 'handler']);
    const generateFile = this.language.classFile([aggregate.name.value, queryName, 'handler']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', queryName]);

    Render.generate({
      templateFile: `${this.templatePath}handler.ejs`,
      templateData: {
        classDto,
        fileDto,
        classService,
        fileService,
        classResponse,
        fileResponse,
        className,
        properties,
        aggregate,
        strProperties: properties.map((e) => e.propertie.name.value).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderService(aggregate: Aggregate, properties: WPropertie[], queryName: string, templateRender: string) {
    const classRepository = this.language.className([aggregate.name.value, 'repository']);
    const fileRepository = this.language.classFile([aggregate.name.value, 'repository'], false);

    const classResponse = this.language.className([aggregate.name.value, 'response']);
    const fileResponse = this.language.classFile([aggregate.name.value, 'response'], false);

    const className = this.language.className([aggregate.name.value, queryName, 'service']);
    const generateFile = this.language.classFile([aggregate.name.value, queryName, 'service']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', queryName]);

    Render.generate({
      templateFile: `${this.templatePath}service.ejs`,
      templateData: {
        classRepository,
        fileRepository,
        classResponse,
        fileResponse,
        templateRender,
        className,
        aggregate,
        properties,
        strProperties: properties.map((e) => e.propertie.name.value).join(', '),
        strVoProperties: properties.map((e) => `${e.propertie.name.value}: ${e.propertie.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
