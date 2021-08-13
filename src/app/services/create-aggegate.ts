import { storage, WPropertie } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Render } from '../render';
import { AbstractService } from './abstract-service';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';

enum EventsEnum {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Aggregate';
  }

  async execute(aggregateName: string): Promise<void> {
    const answers = await inquirer.prompt(Service.questions(aggregateName));

    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames).map((e) => {
      e.setLanguage(this.language);
      return e;
    });

    this.renderAggregate(aggregate, properties, {
      create: answers.events.includes(EventsEnum.CREATE),
      update: answers.events.includes(EventsEnum.UPDATE),
      delete: answers.events.includes(EventsEnum.DELETE),
    });
  }

  private static questions(aggregate: string): QuestionCollection<{ events: string[] }> {
    return [
      {
        type: 'checkbox',
        name: 'events',
        message: `${aggregate} properties`,
        choices: [EventsEnum.CREATE, EventsEnum.UPDATE, EventsEnum.DELETE],
        default: [EventsEnum.CREATE],
      },
    ];
  }

  private renderAggregate(aggregate: Aggregate, properties: WPropertie[], events: { create: boolean; update: boolean; delete: boolean }) {
    const classEventCreated = this.language.className([aggregate.name.value, 'created', 'event']);
    const fileEventCreated = this.language.classFile([aggregate.name.value, 'created', 'event'], false);

    const classEventUpdated = this.language.className([aggregate.name.value, 'updated', 'event']);
    const fileEventUpdated = this.language.classFile([aggregate.name.value, 'updated', 'event'], false);

    const classEventDeleted = this.language.className([aggregate.name.value, 'deleted', 'event']);
    const fileEventDeleted = this.language.classFile([aggregate.name.value, 'deleted', 'event'], false);

    const className = this.language.className([aggregate.name.value]);
    const generateFile = this.language.classFileWithOutType([aggregate.name.value]);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'domain']);

    const propertiesWithOutId = properties.filter((e) => e.propertie.name.value !== 'id');

    Render.generate({
      templateFile: `${this.language.language()}/domain/aggregate.ejs`,
      templateData: {
        classEventCreated,
        fileEventCreated,
        classEventUpdated,
        fileEventUpdated,
        classEventDeleted,
        fileEventDeleted,
        className,
        properties,
        propertiesWithOutId,
        events,
        aggregate,
        strProperties: properties.map((e) => e.propertie.name.value).join(', '),
        strVoProperties: properties.map((e) => `${e.propertie.name.value}: ${e.propertie.className}`).join(', '),
        eventUpdateProperties: propertiesWithOutId.map((e) => `${e.propertie.name.value}: ${e.propertie.className}`).join(', '),
        eventCreateProperties: properties.map((e) => `${e.propertie.name.value}.value`).join(', '),
        eventProperties: properties.map((e) => `this.${e.propertie.name.value}.value`).join(', '),
        strVoUndescoreProperties: properties.map((e) => `private _${e.propertie.name.value}: ${e.propertie.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
