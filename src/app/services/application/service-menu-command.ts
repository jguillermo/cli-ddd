import { storage, WPropertie } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Render } from '../../render';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { ServiceMenuApplicationIndexRender } from './service-menu-application-index';
import { UUIDTypeImp } from 'base-ddd';
import { PropertieTypes } from '../../../modules/load-data/domain/propertie/propertieType';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class ServiceMenuCommand extends AbstractService {
  serviceName(): string {
    return 'Create Command';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);

    const answerTemplate = await inquirer.prompt(ServiceMenuCommand.questionTemplate());

    const answers = await inquirer.prompt(
      this.questions(
        aggregateName,
        properties.map((e) => e.name.fullName),
        answerTemplate.templateRender,
      ),
    );

    const render = new ServiceMenuCommandRender(this._collectionAggregate, this.language);
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

export class ServiceMenuCommandRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/application/command`;
  }

  async execute(aggregateName: string, options: { properties: string[]; commandName: string; templateRender: string }): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const propertiesSelected = storage.getWProperties(options.properties).map((e) => {
      e.setLanguage(this.language);
      return e;
    });

    this.renderDto(aggregate, propertiesSelected, options.commandName, options.templateRender);

    this.renderDtoTest(aggregate, propertiesSelected, options.commandName, options.templateRender);

    this.renderHandler(aggregate, propertiesSelected, options.commandName, options.templateRender);

    this.renderService(aggregate, propertiesSelected, options.commandName, options.templateRender);

    const renderIndex = new ServiceMenuApplicationIndexRender(this._collectionAggregate, this.language);
    await renderIndex.execute(aggregateName);
  }

  private renderDto(aggregate: Aggregate, properties: WPropertie[], commandName: string, templateRender: string) {
    const className = this.language.className([aggregate.name.value, commandName, 'Dto']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'Dto']);
    const generatefolder = this.folderPath(aggregate, [commandName]).application;

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
        properties,
        propertiesDto,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderDtoTest(aggregate: Aggregate, properties: WPropertie[], commandName: string, templateRender: string) {
    if (templateRender !== 'persist') {
      return;
    }
    const classDto = this.language.className([aggregate.name.value, commandName, 'Dto']);
    const fileDto = this.language.classFile([aggregate.name.value, commandName, 'Dto'], false);

    let generateFile = this.language.classFile([aggregate.name.value, commandName, 'Dto'], false);
    generateFile = `${generateFile}.spec${this.language.dotExt()}`;

    const generatefolder = this.folderPath(aggregate, [commandName]).application;

    const propertiesString = properties.map((e) => {
      let valuePrimitive: any = 'WIP';

      if (e.primitivePropertie.type.value === PropertieTypes.ID || e.primitivePropertie.type.value === PropertieTypes.UUID) {
        valuePrimitive = `'${UUIDTypeImp.fromValue('Guille')}'`;
      }
      if (e.primitivePropertie.type.value === PropertieTypes.STRING) {
        valuePrimitive = `'${e.propertie.name.value}'`;
      }
      if (e.primitivePropertie.type.isDate) {
        valuePrimitive = `'2018-03-23'`;
      }
      if (e.primitivePropertie.type.isNumber) {
        valuePrimitive = 12.5;
      }
      if (e.primitivePropertie.type.isBoolean) {
        valuePrimitive = true;
      }
      if (e.primitivePropertie.type.isEnum) {
        const firstValue = e.primitivePropertie.metadataEnum.values.length > 0 ? e.primitivePropertie.metadataEnum.values[0] : '';
        valuePrimitive = `'${firstValue}'`;
      }
      return {
        name: e.propertie.name.value,
        valuePrimitive,
      };
    });

    Render.generate({
      templateFile: `${this.templatePath}/${templateRender}/dto-test.ejs`,
      templateData: {
        classDto,
        fileDto,
        propertiesString,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderHandler(aggregate: Aggregate, properties: WPropertie[], commandName: string, templateRender: string) {
    const classDto = this.language.className([aggregate.name.value, commandName, 'Dto']);
    const fileDto = this.language.classFile([aggregate.name.value, commandName, 'Dto'], false);

    const classService = this.language.className([aggregate.name.value, commandName, 'service']);
    const fileService = this.language.classFile([aggregate.name.value, commandName, 'service'], false);

    const className = this.language.className([aggregate.name.value, commandName, 'handler']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'handler']);
    const generatefolder = this.folderPath(aggregate, [commandName]).application;

    Render.generate({
      templateFile: `${this.templatePath}/${templateRender}/handler.ejs`,
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
    const generatefolder = this.folderPath(aggregate, [commandName]).application;

    const propertiesWithoutId = properties.filter((e) => e.propertie.name.value !== 'id');

    Render.generate({
      templateFile: `${this.templatePath}/${templateRender}/service.ejs`,
      templateData: {
        classRepository,
        fileRepository,
        className,
        aggregate,
        fileAggregate,
        properties,
        templateRender,
        strProperties: properties.map((e) => e.propertie.name.value).join(', '),
        strPropertiesWitoutId: propertiesWithoutId.map((e) => e.propertie.name.value).join(', '),
        strVoProperties: properties.map((e) => `${e.propertie.name.value}: ${e.propertie.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
