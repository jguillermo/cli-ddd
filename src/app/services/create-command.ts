import { storage, WPropertie } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Render } from '../render';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { AbstractService, AbstractServiceResponse } from './abstract-service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Command';
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

    const render = new ServiceRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, { properties: answers.properties, commandName: answers.commandName, templateRender: answerTemplate.templateRender });

  }

  private static questionTemplate(): QuestionCollection<{ templateRender: string }> {
    return [
      {
        type: 'list',
        name: 'templateRender',
        message: `use template`,
        choices: ['persist', 'delete', 'none'],
        default: 'none',
      },
    ];
  }

  private questions(aggregate: string, properties: string[], templateRender: string): QuestionCollection<{ properties: string[]; commandName: string }> {
    let defaultProperties = [...properties];
    let defaultCommandName = templateRender;
    if (templateRender === 'delete') {
      defaultProperties = properties.filter((e) => e.search(/:[Ii]{1}d$/g) >= 0);
    }
    if (templateRender === 'none') {
      defaultCommandName = null;
    }
    return [
      {
        type: 'input',
        name: 'commandName',
        message: `COMMAND name`,
        default: defaultCommandName,
        validate(input: any): boolean | string | Promise<boolean | string> {
          if (s.trim(input).length < 3) {
            return 'COMMAND name must be at least 3 letters.';
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

export class ServiceRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/application/command/`;
  }

  async execute(aggregateName: string, options: { properties: string[]; commandName: string; templateRender: string }): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const propertiesSelected = storage.getWProperties(options.properties).map((e) => {
      e.setLanguage(this.language);
      return e;
    });

    this.renderDto(aggregate, propertiesSelected, options.commandName, options.templateRender);

    this.renderHandler(aggregate, propertiesSelected, options.commandName);

    this.renderService(aggregate, propertiesSelected, options.commandName, options.templateRender);
  }

  private renderDto(aggregate: Aggregate, properties: WPropertie[], commandName: string, templateRender: string) {
    const className = this.language.className([aggregate.name.value, commandName, 'Dto']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'Dto']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${this.templatePath}dto.ejs`,
      templateData: {
        className,
        properties,
        templateRender,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderHandler(aggregate: Aggregate, properties: WPropertie[], commandName: string) {
    const classDto = this.language.className([aggregate.name.value, commandName, 'Dto']);
    const fileDto = this.language.classFile([aggregate.name.value, commandName, 'Dto'], false);

    const classService = this.language.className([aggregate.name.value, commandName, 'service']);
    const fileService = this.language.classFile([aggregate.name.value, commandName, 'service'], false);

    const className = this.language.className([aggregate.name.value, commandName, 'handler']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'handler']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${this.templatePath}handler.ejs`,
      templateData: {
        classDto,
        fileDto,
        classService,
        fileService,
        className,
        properties,
        strProperties: properties.map((e) => e.propertie.name.value).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderService(aggregate: Aggregate, properties: WPropertie[], commandName: string, templateRender: string) {
    const classRepository = this.language.className([aggregate.name.value, 'Repository']);
    const fileRepository = this.language.classFile([aggregate.name.value, 'Repository'], false);

    const fileAggregate = this.language.classFileWithOutType([aggregate.name.value], false);

    const className = this.language.className([aggregate.name.value, commandName, 'service']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'service']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', commandName]);

    const propertiesWithoutId = properties.filter((e) => e.propertie.name.value !== 'id');

    Render.generate({
      templateFile: `${this.templatePath}service.ejs`,
      templateData: {
        classRepository,
        fileRepository,
        templateRender,
        className,
        aggregate,
        fileAggregate,
        properties,
        strProperties: properties.map((e) => e.propertie.name.value).join(', '),
        strPropertiesWitoutId: propertiesWithoutId.map((e) => e.propertie.name.value).join(', '),
        strVoProperties: properties.map((e) => `${e.propertie.name.value}: ${e.propertie.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
