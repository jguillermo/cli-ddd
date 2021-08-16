import { storage, WPropertie } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Render } from '../render';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { AbstractService, AbstractServiceResponse } from './abstract-service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create App Event';
  }

  async execute(aggregateName: string): Promise<void> {
    const listEvents = this.listEvent();
    if (listEvents.length === 0) {
      console.log('No exsit Events');
      return;
    }

    const answerEventName = await inquirer.prompt(Service.questionEventName());

    const answerEventList = await inquirer.prompt(Service.questionEventList(listEvents));

    const answerClassName = await inquirer.prompt(Service.questionClassName(answerEventName.eventName, answerEventList.eventSelected));

    const render = new ServiceRender(this._collectionAggregate, this.language);
  }

  private static questionEventName(): QuestionCollection<{ eventName: string }> {
    return [
      {
        type: 'input',
        name: 'eventName',
        message: `Event name`,
        default: 'Resource',
        validate(input: any): boolean | string | Promise<boolean | string> {
          if (s.trim(input).length < 3) {
            return 'Event name must be at least 3 letters.';
          }
          const regex = /^[a-zA-Z]{2,}$/g;
          if (!regex.test(input)) {
            return 'only caracters de a la a-z A-Z';
          }
          return true;
        },
      },
    ];
  }

  private listEvent(): string[] {
    const eventsList = [];
    Render.fromDir(storage.get('pathRender'), /\.event\.ts$/, function (filename) {
      const fileName = path.basename(filename).replace('.event.ts', '-event').split('-');
      eventsList.push(fileName);
    });
    return eventsList.map((e) => this.language.className(e));
  }

  private static questionEventList(eventsList: string[]): QuestionCollection<{ eventSelected: string }> {
    return [
      {
        type: 'list',
        name: 'eventSelected',
        message: `select event`,
        choices: eventsList,
        pageSize: eventsList.length + 2,
      },
    ];
  }

  private static questionClassName(eventName: string, eventSelected: string): QuestionCollection<{ className: string }> {
    const tempEventSelected = `${eventSelected}`.replace('Event', '');
    return [
      {
        type: 'input',
        name: 'commandName',
        message: `COMMAND name`,
        default: `${eventName}On${tempEventSelected}`,
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
