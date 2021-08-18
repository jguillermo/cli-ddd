import { ServiceMenuGraphQl } from './service-menu-graph-ql';
import { ServiceMenuPropertie } from './service-menu-propertie';
import { ServiceMenuRepository } from './service-menu-repository';
import { ServiceMenuAggregate } from './service-menu-aggregate';
import { ServiceMenuResponse } from './service-menu-response';
import { ServiceMenuFirestore } from './service-menu-firestore';

export const menuServices = [new ServiceMenuGraphQl(), new ServiceMenuPropertie(), new ServiceMenuRepository(), new ServiceMenuAggregate(), new ServiceMenuResponse(), new ServiceMenuFirestore()];
