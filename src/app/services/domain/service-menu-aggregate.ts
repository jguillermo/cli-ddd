import { storage, WPropertie } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Render } from '../../render';
import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
import { ServiceRenderDomainEvent } from './service-menu-domain-event';

export enum EventsEnum {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export class ServiceMenuAggregate extends AbstractService {
  serviceName(): string {
    return 'Create Aggregate';
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames).map((e) => e.propertie.name.fullName);
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);

    const answers = await inquirer.prompt(ServiceMenuAggregate.questions(aggregateName));
    const render = new ServiceMenuAggregateRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, answers.events);

    const renderEvent = new ServiceRenderDomainEvent(this._collectionAggregate, this.language);

    for await (const eventName of answers.events) {
      if (eventName === EventsEnum.CREATE) {
        await renderEvent.execute(aggregateName, { eventName: 'created', eventType: `${aggregate.name.propertie}.created`, properties });
      }
      if (eventName === EventsEnum.UPDATE) {
        await renderEvent.execute(aggregateName, { eventName: 'updated', eventType: `${aggregate.name.propertie}.updated`, properties });
      }
      if (eventName === EventsEnum.DELETE) {
        await renderEvent.execute(aggregateName, { eventName: 'deleted', eventType: `${aggregate.name.propertie}.deleted`, properties });
      }
    }
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
}

export class ServiceMenuAggregateRender extends AbstractServiceResponse {
  async execute(aggregateName: string, options: string[]): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames).map((e) => {
      e.setLanguage(this.language);
      return e;
    });

    this.renderAggregate(aggregate, properties, {
      create: options.includes(EventsEnum.CREATE),
      update: options.includes(EventsEnum.UPDATE),
      delete: options.includes(EventsEnum.DELETE),
    });
  }

  get templatePath(): string {
    return `${this.language.language()}/domain`;
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
    const generatefolder = this.folderPath(aggregate, ['aggregate']).domain;

    const propertiesWithOutId = properties.filter((e) => e.propertie.name.value !== 'id');

    const eventProperties = properties
      .map((e) => {
        if (e.primitivePropertie.type.isDate) {
          return `this.${e.propertie.name.value}.toString`;
        } else {
          return `this.${e.propertie.name.value}.value`;
        }
      })
      .join(', ');

    const eventCreateProperties = properties
      .map((e) => {
        if (e.primitivePropertie.type.isDate) {
          return `${e.propertie.name.value}.toString`;
        } else {
          return `${e.propertie.name.value}.value`;
        }
      })
      .join(', ');

    Render.generate({
      templateFile: `${this.templatePath}/aggregate.ejs`,
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
        eventCreateProperties,
        eventProperties,
        strVoUndescoreProperties: properties.map((e) => `private _${e.propertie.name.value}: ${e.propertie.className}`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }
}
