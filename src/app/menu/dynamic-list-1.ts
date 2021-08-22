import { MenuServices } from './menu-services';
import { ServiceMenuCommand } from '../services/application/service-menu-command';
import { ServiceMenuQuery } from '../services/application/service-menu-query';
import { ServiceMenuInfrastructureEvent } from '../services/infrastructure/service-menu-infrastructure-event';
import { ServiceMenuDomainEvent } from '../services/domain/service-menu-domain-event';
import { ServiceMenuCrud } from '../services/service-menu-crud';
import { MenuApp } from './menu-app';

export const services = [
  new ServiceMenuCommand(),
  new ServiceMenuQuery(),
  new ServiceMenuInfrastructureEvent(),
  new ServiceMenuDomainEvent(),
  new ServiceMenuCrud(),
  new MenuServices(),
  new MenuApp(),
];
