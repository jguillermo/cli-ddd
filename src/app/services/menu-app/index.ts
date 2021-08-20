import { ServiceMenuFirestore } from './service-menu-firestore';
import { ServiceMenuEventIndex } from './service-menu-event-index';
import { ServiceMenuApplicationIndex } from './service-menu-application-index';

export const menuServices = [new ServiceMenuFirestore(), new ServiceMenuEventIndex(), new ServiceMenuApplicationIndex()];
