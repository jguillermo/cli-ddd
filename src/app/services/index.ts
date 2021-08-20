import { MenuServices } from './menu-services/menu-services';
import { ServiceMenuCommand } from './service-menu-command';
import { ServiceMenuQuery } from './service-menu-query';
import { ServiceMenuInfrastructureEvent } from './service-menu-infrastructure-event';
import { ServiceMenuDomainEvent } from './service-menu-domain-event';
import { ServiceMenuCrud } from './service-menu-crud';
import { MenuApp } from './menu-app/menu-app';

export const services = [
  new ServiceMenuCommand(),
  new ServiceMenuQuery(),
  new ServiceMenuInfrastructureEvent(),
  new ServiceMenuDomainEvent(),
  new ServiceMenuCrud(),
  new MenuServices(),
  new MenuApp(),
];
