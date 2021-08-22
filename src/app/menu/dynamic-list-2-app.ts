import { ServiceMenuEventIndex } from '../services/infrastructure/service-menu-event-index';
import { ServiceMenuApplicationIndex } from '../services/application/service-menu-application-index';
import { ServiceMenuInitProject } from '../services/app/service-menu-init-project';

export const menuServices = [new ServiceMenuInitProject(), new ServiceMenuEventIndex(), new ServiceMenuApplicationIndex()];
