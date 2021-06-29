import { CollectionAggregate } from '../../../modules/load-data/domain/CollectionAggregate';
import { Language, LanguageInterface } from '../languages/language';
import { Aggregate } from '../../../modules/load-data/domain/Aggregate';
import { Propertie } from '../../../modules/load-data/domain/propertie/propertie';
import { Render } from '../render';
import { storage } from '../../in-memory-storage';

export class CreatePropertie {
  async execute(properties: string[], aggregateName: string, collectionAggregate: CollectionAggregate) {
    const aggregate = collectionAggregate.getAggregate(aggregateName);
    const service = Language.plugin('node');

    storage.getProperties(properties).map((propertie) => {
      CreatePropertie.renderPropertie(aggregate, service, propertie);
    });
  }

  private static renderPropertie(aggregate: Aggregate, service: LanguageInterface, propertie: Propertie) {
    const className = service.className([propertie.className]);
    const generateFile = service.classFileWithOutType([propertie.className]);
    const generatefolder = service.folderPath([aggregate.path.value, 'domain']);

    Render.generate({
      templateFile: `${service.language()}/domain/types/${propertie.type.value}-type.ejs`,
      templateData: {
        className,
        aggregate,
      },
      generatefolder,
      generateFile,
    });
  }
}
