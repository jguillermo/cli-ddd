import { ServiceMenuGraphQl } from '../services/infrastructure/service-menu-graph-ql';
import { ServiceMenuPropertie } from '../services/domain/service-menu-propertie';
import { ServiceMenuRepository } from '../services/infrastructure/service-menu-repository';
import { ServiceMenuAggregate } from '../services/domain/service-menu-aggregate';
import { ServiceMenuResponse } from '../services/application/service-menu-response';
import { ServiceMenuEventIndex } from '../services/infrastructure/service-menu-event-index';
import { ServiceMenuApplicationIndex } from '../services/application/service-menu-application-index';

export const menuServices = [
  new ServiceMenuGraphQl(),
  new ServiceMenuPropertie(),
  new ServiceMenuRepository(),
  new ServiceMenuAggregate(),
  new ServiceMenuResponse(),
  new ServiceMenuEventIndex(),
  new ServiceMenuApplicationIndex(),
];
