import { factory } from './app/service-factory';
import { storage } from './app/in-memory-storage';
import { services } from './app/services';

async function main() {
  storage.set('pathConfigYaml', factory.ymlToJsonService.relativePath() + '/config-cli');
  storage.set('pathTemplate', factory.ymlToJsonService.relativePath() + '/templates');
  storage.set('pathRender', factory.ymlToJsonService.relativePath() + '/render');

  const jsonData = factory.ymlToJsonService.getData(storage.get('pathConfigYaml'));
  const collectionAggregate = factory.readSkeletonDataService.readData(jsonData);
  storage.setallPropertie(collectionAggregate);
  storage.set('services', services);

  const aggregateSelected = await factory.menuSelectAggregate(collectionAggregate);

  const serviceSelected = await factory.menuAggregate(aggregateSelected);
  await factory.generate(serviceSelected, aggregateSelected, collectionAggregate);
}

main().finally(() => {
  console.log('see you!');
});
