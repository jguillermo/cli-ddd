import { ServiceMenuFirestore } from '../services/app/service-menu-firestore';
import { ServiceMenuEventIndex } from '../services/infrastructure/service-menu-event-index';
import { ServiceMenuApplicationIndex } from '../services/application/service-menu-application-index';

export const menuServices = [new ServiceMenuFirestore(), new ServiceMenuEventIndex(), new ServiceMenuApplicationIndex()];
