import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';
import { Language, LanguageInterface } from '../render/languages/language';
import { storage } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../modules/load-data/domain/propertie/propertie';
import { Render } from '../render/render';
import { GenerateInterface } from '../menu/generate/generate';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class Service implements GenerateInterface {
  serviceName(): string {
    return 'Create Service Command';
  }

  async execute(aggregate: string, collectionAggregate: CollectionAggregate): Promise<void> {
    const properties = storage.getProperties(collectionAggregate.getAggregate(aggregate).propertiesNames);

    const answers = await inquirer.prompt(
      this.questions(
        aggregate,
        properties.map((e) => e.name.fullName),
      ),
    );

    await this.executeCreate(
      answers.commandName,
      answers.properties,
      answers.templateRender,
      aggregate,
      collectionAggregate,
    );
  }

  private questions(
    aggregate: string,
    properties: string[],
  ): QuestionCollection<{ commandName: string; properties: string[]; templateRender: string }> {
    return [
      {
        type: 'input',
        name: 'commandName',
        message: `COMMAND name`,
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
        default: properties,
      },
      {
        type: 'list',
        name: 'templateRender',
        message: `use template`,
        choices: ['create', 'update', 'delete', 'none'],
        default: 'none',
      },
    ];
  }

  async executeCreate(
    commandName: string,
    properties: string[],
    templateRender: string,
    aggregateName: string,
    collectionAggregate: CollectionAggregate,
  ) {
    const aggregate = collectionAggregate.getAggregate(aggregateName);
    const service = Language.plugin('node');

    Service.renderService(aggregate, service, storage.getProperties(properties), templateRender, commandName);

    Service.renderCommand(aggregate, service, storage.getProperties(properties), commandName);

    Service.renderHandler(aggregate, service, storage.getProperties(properties), commandName);
  }

  private static renderCommand(
    aggregate: Aggregate,
    service: LanguageInterface,
    properties: Propertie[],
    commandName: string,
  ) {
    const classInput = service.className([aggregate.name.value, commandName, 'Input']);
    const className = service.className([aggregate.name.value, commandName, 'Command']);
    const generateFile = service.classFile([aggregate.name.value, commandName, 'Command']);
    const generatefolder = service.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${service.language()}/application/command/command.ejs`,
      templateData: {
        classInput,
        className,
        properties,
      },
      generatefolder,
      generateFile,
    });
  }

  private static renderService(
    aggregate: Aggregate,
    service: LanguageInterface,
    properties: Propertie[],
    templateRender: string,
    commandName: string,
  ) {
    const className = service.className([aggregate.name.value, commandName, 'service']);
    const generateFile = service.classFile([aggregate.name.value, commandName, 'service']);
    const generatefolder = service.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${service.language()}/application/command/service.ejs`,
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

  private static renderHandler(
    aggregate: Aggregate,
    service: LanguageInterface,
    properties: Propertie[],
    commandName: string,
  ) {
    const classCommand = service.className([aggregate.name.value, commandName, 'command']);
    const classService = service.className([aggregate.name.value, commandName, 'service']);
    const className = service.className([aggregate.name.value, commandName, 'handler']);
    const generateFile = service.classFile([aggregate.name.value, commandName, 'handler']);
    const generatefolder = service.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${service.language()}/application/command/handler.ejs`,
      templateData: {
        classCommand,
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
