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
      console.log('No exist Events');
      return;
    }

    const answerEventList = await inquirer.prompt(Service.questionEventList(listEvents));

    const answerEventName = await inquirer.prompt(Service.questionName());

    const render = new ServiceRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, { eventSelected: answerEventList.eventSelected, eventName: answerEventName.eventName });
  }

  private static questionName(): QuestionCollection<{ eventName: string }> {
    return [
      {
        type: 'input',
        name: 'eventName',
        message: `Name`,
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
}

export class ServiceRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/infrastructure/event`;
  }

  async execute(aggregateName: string, options: { eventSelected: string; eventName: string }): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);

    this.renderDto(aggregate, options.eventSelected, options.eventName);
  }

  private renderDto(aggregate: Aggregate, eventSelected: string, eventName: string) {
    const tempEventSelected = `${eventSelected}`.replace('Event', '');

    const eventFile = this.language.classFile([tempEventSelected, 'event']);

    const className = this.language.className([eventName, 'on', tempEventSelected]);
    const generateFile = this.language.classFileWithOutType([eventName, 'on', tempEventSelected]);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'infrastructure', 'event']);

    Render.generate({
      templateFile: `${this.templatePath}/event.ejs`,
      templateData: {
        className,
        eventSelected,
        eventFile,
      },
      generatefolder,
      generateFile,
    });
  }
}
