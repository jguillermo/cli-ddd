import { Service as CommandService } from './create-command';
import { Service as PropertieService } from './create-propertie';

export const services = [new CommandService(), new PropertieService()];
