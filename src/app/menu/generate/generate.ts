import { ServiceCommand } from './services/service-command';
import { CreateCommandService } from '../../render/services/create-command-service';
import { Propertie } from './services/propertie';
import { CreatePropertie } from '../../render/services/create-propertie';
import { CollectionAggregate } from '../../../modules/load-data/domain/CollectionAggregate';

export enum GenerateType {
  CREATE_SERVICE_COMMAND = 'Create Service Command',
  CREATE_SERVICE_QUERY = 'Create Service Query',
  CREATE_EVENT = 'Create Event',
  GENERATE_CORE = 'Generate Core',
  GENERATE_PROPERTIE = 'Generate Propertie',
}

export interface GenerateInterface {
  execute(aggregate: string, collectionAggregate: CollectionAggregate): void | Promise<void>;
}

export class Generate {
  execute(type: string): GenerateInterface {
    switch (type) {
      case GenerateType.CREATE_SERVICE_COMMAND:
        return new ServiceCommand(new CreateCommandService());
        break;
      case GenerateType.GENERATE_PROPERTIE:
        return new Propertie(new CreatePropertie());
        break;
      default:
        throw new Error(`Type: ${type} is not defined`);
    }
  }
}
