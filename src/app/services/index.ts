import { Service as CommandService } from './create-command';
import { Service as PropertieService } from './create-propertie';
import { Service as QueryService } from './create-query';
import { Service as AggregateService } from './create-aggregate';
import { Service as ResponseService } from './create-response';
import { Service as AppGraphQl } from './create-app-graph-ql';
import { Service as AppEvent } from './create-app-event';
import { Service as DomainEvent } from './create-domain-event';
import { Service as Repository } from './create-repository';
import { Service as Firestore } from './create-firestore';

export const services = [
  new CommandService(),
  new QueryService(),
  new AppGraphQl(),
  new AppEvent(),
  new DomainEvent(),
  new PropertieService(),
  new Repository(),
  new AggregateService(),
  new ResponseService(),
  new Firestore(),
];
