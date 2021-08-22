import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { Render } from '../../render';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export class ServiceMenuInitProject extends AbstractService {
  serviceName(): string {
    return 'Init Project';
  }

  async execute(aggregateName: string): Promise<void> {
    const render = new ServiceRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}

class ServiceRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/app`;
  }

  async execute(aggregateName: string): Promise<void> {
    this.renderFirestore();
    this.renderFile('test', 'testing-e2e-module.ts', 'test');
    this.renderFile('make', 'Makefile');
    this.copyShareModule();
  }

  private copyShareModule(): void {
    Render.copyFolder(this.language.language(), 'app/share', 'src/share');
  }

  private renderFirestore() {
    this.renderFile('firestore', '.firebaserc');
    this.renderFile('firestore', 'firebase.json');
    this.renderFile('firestore', 'firestore.indexes.json');
    this.renderFile('firestore', 'firestore.rules');
  }

  private renderFile(folder: string, file: string, folderRender?: string) {
    Render.copy({
      templateFile: path.join(this.templatePath, folder, file),
      templateData: {},
      generatefolder: '',
      generateFile: folderRender ? path.join(folderRender, file) : file,
    });
  }
}
