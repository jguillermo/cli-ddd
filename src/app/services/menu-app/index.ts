import { ServiceMenuFirestore } from './service-menu-firestore';
import { ServiceMenuEventIndex } from './service-menu-event-index';

export const menuServices = [new ServiceMenuFirestore(), new ServiceMenuEventIndex()];
