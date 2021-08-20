import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { Render } from '../../render';
import { storage } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export class ServiceMenuEventIndex extends AbstractService {
  serviceName(): string {
    return 'Update index Event';
  }

  async execute(aggregateName: string): Promise<void> {
    const render = new ServiceRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}

export class ServiceRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/infrastructure/event`;
  }

  async execute(aggregateName: string): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const events = this.listEvent(aggregate);
    this.renderIndex(events, aggregate);
  }

  private listEvent(aggregate: Aggregate): any[] {
    const eventsList = [];
    const pathEvents = path.join(storage.get('pathRender'), aggregate.path.value, 'infrastructure', 'event');
    Render.fromDir(pathEvents, /\.ts$/, function (filename) {
      const fileName = path.basename(filename).replace('.ts', '').split('-');
      eventsList.push(fileName);
    });
    return eventsList.map((e) => {
      return {
        className: this.language.className(e),
        fileName: this.language.classFileWithOutType(e),
      };
    });
  }

  private renderIndex(events: any[], aggregate: Aggregate) {
    const generateFile = this.language.classFileWithOutType(['index']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'infrastructure', 'event']);

    Render.generate(
      {
        templateFile: `${this.templatePath}/index.ejs`,
        templateData: {
          events,
          classInline: events.map((e) => e.className).join(', '),
        },
        generatefolder,
        generateFile,
      },
      true,
    );
  }
}
