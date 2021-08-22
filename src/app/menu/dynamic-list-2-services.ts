import { ServiceMenuGraphQl } from '../services/infrastructure/service-menu-graph-ql';
import { ServiceMenuPropertie } from '../services/domain/service-menu-propertie';
import { ServiceMenuRepository } from '../services/infrastructure/service-menu-repository';
import { ServiceMenuAggregate } from '../services/domain/service-menu-aggregate';
import { ServiceMenuResponse } from '../services/application/service-menu-response';

export const menuServices = [new ServiceMenuGraphQl(), new ServiceMenuPropertie(), new ServiceMenuRepository(), new ServiceMenuAggregate(), new ServiceMenuResponse()];
