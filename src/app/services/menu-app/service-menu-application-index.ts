import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { Render } from '../../render';
import { storage } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export class ServiceMenuApplicationIndex extends AbstractService {
  serviceName(): string {
    return 'Update index Application';
  }

  async execute(aggregateName: string): Promise<void> {
    const render = new ServiceRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}

export class ServiceRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/application`;
  }

  async execute(aggregateName: string): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const handlers = this.listFiles(/\.handler\.ts$/, aggregate);
    const services = this.listFiles(/\.service\.ts$/, aggregate);
    this.renderIndex(handlers, services, aggregate);
  }

  private listFiles(regex: any, aggregate: Aggregate): any[] {
    const eventsList = [];
    const pathEvents = path.join(storage.get('pathRender'), aggregate.path.value, 'application');
    Render.fromDir(pathEvents, regex, function (fullFilePath) {
      console.log(fullFilePath);
      const fileDirName = path.dirname(fullFilePath).split('/');
      const fileWithoutExt = path.basename(fullFilePath).replace('.ts', '');
      eventsList.push({
        fileWithoutExt: fileWithoutExt.replace('.', '-').split('-'),
        filePath: `${fileDirName.pop()}/${fileWithoutExt}`,
      });
    });
    return eventsList.map((e) => {
      return {
        className: this.language.className(e.fileWithoutExt),
        filePath: e.filePath,
      };
    });
  }

  private renderIndex(handlers: any[], services: any[], aggregate: Aggregate) {
    const generateFile = this.language.classFileWithOutType(['index']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'application']);

    Render.generate(
      {
        templateFile: `${this.templatePath}/index.ejs`,
        templateData: {
          handlers,
          services,
          handlersInline: handlers.map((e) => e.className).join(', '),
          servicesInline: services.map((e) => e.className).join(', '),
        },
        generatefolder,
        generateFile,
      },
      true,
    );
  }
}
