import { AbstractService } from './abstract-service';

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Repository';
  }
  async execute(aggregateName: string): Promise<void> {
    console.log(`WIP ${this.serviceName()} ${aggregateName}`);
  }
}
