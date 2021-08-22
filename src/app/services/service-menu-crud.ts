import { AbstractService } from './abstract-service';
import { ServiceMenuResponseRender } from './application/service-menu-response';
import { ServiceMenuRepositoryRender } from './infrastructure/service-menu-repository';
import { ServiceMenuGraphQlRender } from './infrastructure/service-menu-graph-ql';
import { storage } from '../in-memory-storage';
import { ServiceRenderDomainEvent } from './domain/service-menu-domain-event';
import { EventsEnum, ServiceMenuAggregateRender } from './domain/service-menu-aggregate';
import { ServiceMenuPropertieRender } from './domain/service-menu-propertie';
import { ServiceMenuCommandRender } from './application/service-menu-command';
import { ServiceMenuQueryRender } from './application/service-menu-query';
import { ServiceMenuInfrastructureEventRender } from './infrastructure/service-menu-infrastructure-event';
import { ServiceMenuAppModuleRender } from './app/service-menu-app-module';

export class ServiceMenuCrud extends AbstractService {
  serviceName(): string {
    return 'Generate CRUD';
  }

  async execute(aggregateName: string): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const classAggregate = this.language.className([aggregate.name.value]);

    await this.response(aggregateName);
    await this.repository(aggregateName);
    await this.graphQl(aggregateName);
    await this.aggregate(aggregateName);
    await this.properties(aggregateName);
    await this.command(aggregateName, 'persist');
    await this.command(aggregateName, 'delete');

    await this.query(aggregateName, 'findById');
    await this.query(aggregateName, 'list');

    await this.infrastructureEvent(aggregateName, `${classAggregate}CreatedEvent`);
    await this.infrastructureEvent(aggregateName, `${classAggregate}UpdatedEvent`);
    await this.infrastructureEvent(aggregateName, `${classAggregate}DeletedEvent`);
    await this.module(aggregateName);
  }

  async response(aggregateName: string): Promise<void> {
    const render = new ServiceMenuResponseRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }

  async repository(aggregateName: string): Promise<void> {
    const render = new ServiceMenuRepositoryRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }

  async graphQl(aggregateName: string): Promise<void> {
    const render = new ServiceMenuGraphQlRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }

  async aggregate(aggregateName: string): Promise<void> {
    const properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames).map((e) => e.propertie.name.fullName);
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);

    const render = new ServiceMenuAggregateRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, [EventsEnum.CREATE, EventsEnum.UPDATE, EventsEnum.DELETE]);

    const renderEvent = new ServiceRenderDomainEvent(this._collectionAggregate, this.language);
    await renderEvent.execute(aggregateName, { eventName: 'created', eventType: `${aggregate.name.propertie}.created`, properties });
    await renderEvent.execute(aggregateName, { eventName: 'updated', eventType: `${aggregate.name.propertie}.updated`, properties });
    await renderEvent.execute(aggregateName, { eventName: 'deleted', eventType: `${aggregate.name.propertie}.deleted`, properties });
  }

  async properties(aggregateName: string): Promise<void> {
    const properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames).map((e) => e.propertie.name.fullName);
    const render = new ServiceMenuPropertieRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, { properties });
  }

  async command(aggregateName: string, templateRender: string): Promise<void> {
    let properties = storage.getProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames).map((e) => e.name.fullName);
    if (templateRender === 'delete') {
      properties = properties.filter((e) => e.search(/:[Ii]{1}d$/g) >= 0);
    }
    const render = new ServiceMenuCommandRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, { properties, commandName: templateRender, templateRender });
  }

  async query(aggregateName: string, templateRender: string): Promise<void> {
    let properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames).map((e) => e.propertie.name.fullName);
    if (templateRender === 'findById') {
      properties = properties.filter((e) => e.search(/:[Ii]{1}d$/g) >= 0);
    }
    const render = new ServiceMenuQueryRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, { properties, queryName: templateRender, templateRender });
  }

  async infrastructureEvent(aggregateName: string, eventSelected: string): Promise<void> {
    const render = new ServiceMenuInfrastructureEventRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName, { eventSelected, eventName: 'Resource' });
  }

  async module(aggregateName: string): Promise<void> {
    const render = new ServiceMenuAppModuleRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}
