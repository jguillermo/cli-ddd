#!/usr/bin/env node

import { factory } from './app/service-factory';
import { storage } from './app/in-memory-storage';
import { services } from './app/services';
import * as path from 'path';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const copydir = require('copy-dir');

function createFolderConfig() {
  if (!fs.existsSync(storage.get('pathConfigYaml'))) {
    copydir.sync(path.join(storage.get('pathTemplate'), 'config-cli'), storage.get('pathConfigYaml'), {
      utimes: true,
      mode: true,
      cover: true,
    });
  }
}

async function main() {
  storage.set('pathConfigYaml', factory.ymlToJsonService.relativePath() + '/config-cli');
  storage.set('pathTemplate', path.join(__dirname, '../', '/templates'));
  storage.set('pathRender', factory.ymlToJsonService.relativePath());

  createFolderConfig();

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
