import { storage } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../modules/load-data/domain/propertie/propertie';
import { Render } from '../render';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { AbstractService } from './abstract-service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Query';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);

    const answers = await inquirer.prompt(
      this.questions(
        aggregateName,
        properties.map((e) => e.name.fullName),
      ),
    );

    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const propertiesSelected = storage.getProperties(answers.properties);

    this.renderService(aggregate, propertiesSelected, answers.queryName, answers.templateRender);

    this.renderQuery(aggregate, propertiesSelected, answers.queryName);

    this.renderHandler(aggregate, propertiesSelected, answers.queryName);
  }

  private questions(aggregate: string, properties: string[]): QuestionCollection<{ queryName: string; properties: string[]; templateRender: string }> {
    return [
      {
        type: 'input',
        name: 'queryName',
        message: `QUERY name`,
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
        default: properties,
      },
      {
        type: 'list',
        name: 'templateRender',
        message: `use template`,
        choices: ['entity', 'list', 'none'],
        default: 'none',
      },
    ];
  }

  get templatePath(): string {
    return `${this.language.language()}/application/query/`;
  }

  private renderQuery(aggregate: Aggregate, properties: Propertie[], queryName: string) {
    const classInput = this.language.className([aggregate.name.value, queryName, 'Input']);
    const className = this.language.className([aggregate.name.value, queryName, 'Query']);
    const generateFile = this.language.classFile([aggregate.name.value, queryName, 'Query']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', queryName]);

    Render.generate({
      templateFile: `${this.templatePath}query.ejs`,
      templateData: {
        classInput,
        className,
        properties,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderService(aggregate: Aggregate, properties: Propertie[], queryName: string, templateRender: string) {
    const className = this.language.className([aggregate.name.value, queryName, 'service']);
    const generateFile = this.language.classFile([aggregate.name.value, queryName, 'service']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', queryName]);

    Render.generate({
      templateFile: `${this.templatePath}service.ejs`,
      templateData: {
        templateRender,
        className,
        aggregate,
        strProperties: properties.map((e) => e.name.value).join(', '),
        strVoProperties: properties.map((e) => `${e.name.value}: ${e.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderHandler(aggregate: Aggregate, properties: Propertie[], queryName: string) {
    const classQuery = this.language.className([aggregate.name.value, queryName, 'query']);
    const classService = this.language.className([aggregate.name.value, queryName, 'service']);
    const className = this.language.className([aggregate.name.value, queryName, 'handler']);
    const generateFile = this.language.classFile([aggregate.name.value, queryName, 'handler']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', queryName]);

    Render.generate({
      templateFile: `${this.templatePath}handler.ejs`,
      templateData: {
        classQuery,
        classService,
        className,
        properties,
        strProperties: properties.map((e) => e.name.value).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
