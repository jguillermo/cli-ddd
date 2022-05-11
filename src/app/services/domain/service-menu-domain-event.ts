import { storage, WPropertie } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Render } from '../../render';
import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import * as inquirer from 'inquirer';
import { QuestionCollection } from 'inquirer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const s = require('underscore.string');

export class ServiceMenuDomainEvent extends AbstractService {
  serviceName(): string {
    return 'Create Domain Event';
  }

  async execute(aggregateName: string): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames);
    const answerEvent = await inquirer.prompt(ServiceMenuDomainEvent.questionsEvent(aggregateName));
    const answerText = await inquirer.prompt(
      ServiceMenuDomainEvent.questionsText(
        aggregate.name.propertie,
        answerEvent.eventAction,
        properties.map((e) => e.name.fullName),
      ),
    );

    const render = new ServiceRenderDomainEvent(this._collectionAggregate, this.language);
    await render.execute(aggregateName, { eventName: answerEvent.eventAction, eventType: answerText.eventType, properties: answerText.properties });
  }

  private static questionsEvent(aggregateName: string): QuestionCollection<{ eventAction: string }> {
    return [
      {
        type: 'input',
        name: 'eventAction',
        message: `${aggregateName} event name: created, updated, deleted`,
        validate(input: any): boolean | string | Promise<boolean | string> {
          if (s.trim(input).length < 3) {
            return 'EVENT name must be at least 3 letters.';
          }
          const regex = /^[a-zA-Z]{2,}$/g;
          if (!regex.test(input)) {
            return 'only caracter a-z A-Z';
          }
          return true;
        },
      },
    ];
  }

  private static questionsText(aggregateName: string, eventAction: string, properties: string[]): QuestionCollection<{ events: string[] }> {
    return [
      {
        type: 'input',
        name: 'eventType',
        message: `event text`,
        default: `${aggregateName}.${eventAction}`,
        validate(input: any): boolean | string | Promise<boolean | string> {
          if (s.trim(input).length < 3) {
            return 'Nombre name must be at least 3 letters.';
          }
          const regex = /^[a-zA-Z]+[.]{1}([a-zA-Z]+)?([a-zA-Z.]+)?[a-zA-Z]+$/g;
          if (!regex.test(input)) {
            return 'only caracters a-z A-Z and .';
          }
          return true;
        },
      },
      {
        type: 'checkbox',
        name: 'properties',
        message: `Properties`,
        choices: properties,
        default: properties,
      },
    ];
  }
}

export class ServiceRenderDomainEvent extends AbstractServiceResponse {
  async execute(aggregateName: string, options: { eventName: string; eventType: string; properties: string[] }): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const properties = storage.getWProperties(options.properties).map((e) => {
      e.setLanguage(this.language);
      return e;
    });

    this.renderEvent(aggregate, properties, options.eventName, options.eventType);
  }

  get templatePath(): string {
    return `${this.language.language()}/domain`;
  }

  private renderEvent(aggregate: Aggregate, properties: WPropertie[], eventName: string, eventType: string) {
    const className = this.language.className([aggregate.name.value, eventName, 'event']);
    const generateFile = this.language.classFile([aggregate.name.value, eventName, 'event']);
    const generatefolder = this.folderPath(aggregate).domain;

    const strVoUndescoreProperties = properties
      .map((e) => {
        if (e.primitivePropertie.type.isDate) {
          return `private _${e.propertie.name.value}: string`;
        } else {
          return `private _${e.propertie.name.value}: ${e.primitive}`;
        }
      })
      .join(', ');

    const propertiesEvent = properties.map((e) => {
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
      templateFile: `${this.templatePath}/event.ejs`,
      templateData: {
        eventType,
        className,
        propertiesEvent,
        strVoUndescoreProperties,
      },
      generatefolder,
      generateFile,
    });
  }
}
