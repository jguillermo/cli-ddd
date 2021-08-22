import { AbstractService, AbstractServiceResponse } from '../abstract-service';
import { Render } from '../../render';
import { storage } from '../../in-memory-storage';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';

export class ServiceMenuAppModule extends AbstractService {
  serviceName(): string {
    return 'Create App Module';
  }

  async execute(aggregateName: string): Promise<void> {
    const render = new ServiceMenuAppModuleRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}

export class ServiceMenuAppModuleRender extends AbstractServiceResponse {
  get templatePath(): string {
    return `${this.language.language()}/app`;
  }

  async execute(aggregateName: string): Promise<void> {
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    this.renderModule(aggregate);
  }

  private renderModule(aggregate: Aggregate) {
    const { fileModule } = this.resources(aggregate);
    const generateFile = fileModule + this.language.dotExt();
    const generatefolder = this.language.folderPath([aggregate.path.value]);

    Render.generate({
      templateFile: `${this.templatePath}/module.ejs`,
      templateData: {
        ...this.resources(aggregate),
      },
      generatefolder,
      generateFile,
    });
  }
}
