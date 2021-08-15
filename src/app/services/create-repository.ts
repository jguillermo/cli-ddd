import { AbstractService, AbstractServiceResponse } from './abstract-service';
import { storage, WPropertie } from '../in-memory-storage';
import { Aggregate } from '../../modules/load-data/domain/Aggregate';
import { Render } from '../render';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluralize = require('pluralize');

export class Service extends AbstractService {
  serviceName(): string {
    return 'Create Repository';
  }

  async execute(aggregateName: string): Promise<void> {
    const render = new ServiceRender(this._collectionAggregate, this.language);
    await render.execute(aggregateName);
  }
}

export class ServiceRender extends AbstractServiceResponse {
  get templatePath(): string {
    return this.language.language();
  }

  async execute(aggregateName: string): Promise<void> {
    const properties = storage.getWProperties(this._collectionAggregate.getAggregate(aggregateName).propertiesNames).map((e) => {
      e.setLanguage(this.language);
      return e;
    });
    const aggregate = this._collectionAggregate.getAggregate(aggregateName);
    const propertieId = properties.filter((e) => e.propertie.name.value == 'id')[0];

    this.renderDomainRepository(aggregate, propertieId);
    this.renderInfratructureDao(aggregate, properties);
    this.renderInfratructureRepository(aggregate, propertieId);
  }

  private renderDomainRepository(aggregate: Aggregate, propertieId: WPropertie) {
    const className = this.language.className([aggregate.name.value, 'Repository']);
    const generateFile = this.language.classFile([aggregate.name.value, 'Repository']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'domain']);

    Render.generate({
      templateFile: `${this.templatePath}/domain/repository.ejs`,
      templateData: {
        aggregate,
        className,
        propertieId,
      },
      generatefolder,
      generateFile,
    });
  }

  private renderInfratructureDao(aggregate: Aggregate, properties: WPropertie[]) {
    const className = this.language.className([aggregate.name.value, 'Dao']);
    const generateFile = this.language.classFile([aggregate.name.value, 'Dao']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'infrastructure', 'persistence']);

    Render.generate({
      templateFile: `${this.templatePath}/infrastructure/persistence/firestore/dao.ejs`,
      templateData: {
        aggregate,
        className,
        properties,
        strProperties: properties.map((e) => `new ${e.propertie.className}(this.${e.propertie.name.value})`).join(', '),
      },
      generatefolder,
      generateFile,
    });
  }

  private renderInfratructureRepository(aggregate: Aggregate, propertieId: WPropertie) {
    const classDao = this.language.className([aggregate.name.value, 'Dao']);
    const fileDao = this.language.classFile([aggregate.name.value, 'Dao'], false);

    const classRepository = this.language.className([aggregate.name.value, 'Repository']);
    const fileRepository = this.language.classFile([aggregate.name.value, 'Repository'], false);

    const className = this.language.className([aggregate.name.value, 'firestore', 'repository']);
    const generateFile = this.language.classFile([aggregate.name.value, 'firestore', 'repository']);
    const generatefolder = this.language.folderPath([aggregate.path.value, 'infrastructure', 'persistence']);

    Render.generate({
      templateFile: `${this.templatePath}/infrastructure/persistence/firestore/firestore.ejs`,
      templateData: {
        classRepository,
        fileRepository,
        classDao,
        fileDao,
        aggregate,
        className,
        propertieId,
        aggregatePlural: pluralize(aggregate.name.propertie),
      },
      generatefolder,
      generateFile,
    });
  }
}
