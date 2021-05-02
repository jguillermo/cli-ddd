import { factory } from './service-factory';
import { storage } from './in-memory-storage';

async function main() {
  storage.set('pathConfigYaml', factory.ymlToJsonService.relativePath() + '/config-cli');
  storage.set('pathTemplate', factory.ymlToJsonService.relativePath() + '/templates');
  storage.set('pathRender', factory.ymlToJsonService.relativePath() + '/render');

  const jsonData = factory.ymlToJsonService.getData(storage.get('pathConfigYaml'));
  const collectionAggregate = factory.readSkeletonDataService.readData(jsonData);
  storage.setallPropertie(collectionAggregate);

  const aggregateSelected = await factory.menuSelectAggregate(collectionAggregate);
  const menuSelected = await factory.menuAggregate(aggregateSelected);
  await factory.generateFactory.execute(menuSelected).execute(aggregateSelected, collectionAggregate);
}

main().finally(() => {
  console.log('see you!');
});
