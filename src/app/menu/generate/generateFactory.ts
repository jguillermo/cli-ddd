import { GenerateInterface } from './generate-Interface';
import { GenerateType } from './generateType';
import { ServiceCommand } from './services/service-command';
import { CreateCommandService } from '../../render/services/create-command-service';
import { Propertie } from './services/propertie';
import { CreatePropertie } from '../../render/services/create-propertie';

export class GenerateFactory {
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
