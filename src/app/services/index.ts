import { MenuServices } from './menu-services/menu-services';
import { ServiceMenuCommand } from './service-menu-command';
import { ServiceMenuQuery } from './service-menu-query';
import { ServiceMenuInfrastructureEvent } from './service-menu-infrastructure-event';
import { ServiceMenuDomainEvent } from './service-menu-domain-event';

export const services = [new ServiceMenuCommand(), new ServiceMenuQuery(), new ServiceMenuInfrastructureEvent(), new ServiceMenuDomainEvent(), new MenuServices()];
