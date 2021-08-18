import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { Render } from '../../render';

export class ServiceMenuFirestore extends AbstractService {
  serviceName(): string {
    return 'Create Firestore';
  }

  async execute(aggregateName: string): Promise<void> {
    const render = new ServiceRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}

export class ServiceRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/app/firestore`;
  }

  async execute(aggregateName: string): Promise<void> {
    this.renderFile('.firebaserc');
    this.renderFile('firebase.json');
    this.renderFile('firestore.indexes.json');
    this.renderFile('firestore.rules');
  }

  private renderFile(file: string) {
    Render.copy({
      templateFile: `${this.templatePath}/${file}`,
      templateData: {},
      generatefolder: '',
      generateFile: file,
    });
  }
}
