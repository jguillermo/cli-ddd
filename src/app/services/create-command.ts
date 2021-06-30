import { CollectionAggregate } from '../../modules/load-data/domain/CollectionAggregate';
import { Language, LanguageInterface } from '../languages/language';
import { storage } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../modules/load-data/domain/propertie/propertie';
import { Render } from '../render';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { GenerateInterface } from '../menu/menu-services';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class Service implements GenerateInterface {
  private templatePath: string;
  private language: LanguageInterface;

  constructor() {
    this.language = Language.plugin('node');
    this.templatePath = `${this.language.language()}/application/command/`;
  }

  serviceName(): string {
    return 'Create Command';
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

    this.renderService(aggregate, storage.getProperties(properties), templateRender, commandName);

    this.renderCommand(aggregate, storage.getProperties(properties), commandName);

    this.renderHandler(aggregate, storage.getProperties(properties), commandName);
  }

  private renderCommand(aggregate: Aggregate, properties: Propertie[], commandName: string) {
    const classInput = this.language.className([aggregate.name.value, commandName, 'Input']);
    const className = this.language.className([aggregate.name.value, commandName, 'Command']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'Command']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${this.language.language()}/application/command/command.ejs`,
      templateData: {
        classInput,
        className,
        properties,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderService(aggregate: Aggregate, properties: Propertie[], templateRender: string, commandName: string) {
    const className = this.language.className([aggregate.name.value, commandName, 'service']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'service']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${this.language.language()}/application/command/service.ejs`,
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

  private renderHandler(aggregate: Aggregate, properties: Propertie[], commandName: string) {
    const classCommand = this.language.className([aggregate.name.value, commandName, 'command']);
    const classService = this.language.className([aggregate.name.value, commandName, 'service']);
    const className = this.language.className([aggregate.name.value, commandName, 'handler']);
    const generateFile = this.language.classFile([aggregate.name.value, commandName, 'handler']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application', commandName]);

    Render.generate({
      templateFile: `${this.language.language()}/application/command/handler.ejs`,
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
