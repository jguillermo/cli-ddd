import { Service as CommandService } from './create-command';
import { Service as PropertieService } from './create-propertie';
import { Service as QueryService } from './create-query';

export const services = [new CommandService(), new QueryService(), new PropertieService()];

/*
export enum GenerateType {
  CREATE_SERVICE_COMMAND = 'Create Service Command',
  CREATE_SERVICE_QUERY = 'Create Service Query',
  CREATE_EVENT = 'Create Event',
  GENERATE_CORE = 'Generate Core',
  GENERATE_PROPERTIE = 'Generate Propertie',
}
*/
