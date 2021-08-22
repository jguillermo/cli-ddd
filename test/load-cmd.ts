import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spawn = require('child_process').spawn;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const concat = require('concat-stream');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rimraf = require('rimraf');

const cliPath = __dirname + '/../dist/index.js';
const renderPath = __dirname + '/../render';
const snapShotPath = __dirname + '/snapshot';

export function cleanRender() {
  rimraf.sync(renderPath);
}

export function readRender(pathRender: string): string {
  return fs.readFileSync(path.join(renderPath, pathRender), 'utf-8');
}

export function copyfromSnapToRender(pathSnap: string, pathRender: string): void {
  const pathAbsSnap = path.join(snapShotPath, pathSnap);
  const pathAbsRender = path.join(renderPath, pathRender);
  const folderGenerate = path.dirname(pathAbsRender);
  fs.mkdirSync(folderGenerate, { recursive: true });
  fs.copyFileSync(pathAbsSnap, pathAbsRender);
}

export function removeRender(pathRender: string): void {
  const pathFile = path.join(renderPath, pathRender);
  if (fs.existsSync(pathFile)) {
    try {
      if (fs.lstatSync(pathFile).isDirectory()) {
        rimraf.sync(pathFile);
      } else {
        fs.unlinkSync(pathFile);
        //file removed
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export function renderExist(pathRender: string): boolean {
  const pathFile = path.join(renderPath, pathRender);
  if (!fs.existsSync(pathFile)) {
    console.error(pathFile);
  }
  return fs.existsSync(pathFile);
}

export function readSnapShot(pathSnap: string): string {
  return fs.readFileSync(path.join(snapShotPath, pathSnap), 'utf-8');
}

export function run(combo, timeout = 200) {
  const proc = spawn('node', [cliPath], { stdio: [null, null, null] });
  proc.stdin.setEncoding('utf-8');
  const loop = function (combo) {
    if (combo.length > 0) {
      setTimeout(function () {
        proc.stdin.write(combo[0]);
        loop(combo.slice(1));
      }, timeout);
    } else {
      proc.stdin.end();
    }
  };
  loop(combo);
  return new Promise(function (resolve) {
    proc.stdout.pipe(
      concat(function (result) {
        resolve(result.toString());
      }),
    );
  });
}

export const DOWN = '\x1B\x5B\x42';
export const UP = '\x1B\x5B\x41';
export const ENTER = '\x0D';
export const SPACE = '\x20';

//propertires user
export enum MenuPropertie {
  USER = 'user',
  PRODUCT = 'product',
}

export enum DDD {
  APPLICATION_COMMAND = 'application_command',
  APPLICATION_QUERY = 'application_query',
  APPLICATION_RESPONSE = 'application_response',
  APPLICATION_INDEX = 'application_index',
  DOMAIN_AGGREGATE = 'domain_aggregate',
  DOMAIN_EVENT = 'domain_event',
  DOMAIN_PROPERTIE = 'domain_propertie',
  INFRASTRUCTURE_EVENT = 'infrastructure_event',
  INFRASTRUCTURE_EVENT_INDEX = 'infrastructure_event_index',
  INFRASTRUCTURE_GRAPH_QL = 'infrastructure_graph_ql',
  INFRASTRUCTURE_REPOSITORY = 'infrastructure_repository',
  INT_PROJET = 'init_project',
  APP_CRUD = 'app_crud',
}

export function menuAggregate(aggregate: MenuPropertie): string[] {
  let menu = [];
  switch (aggregate) {
    case MenuPropertie.USER: {
      menu = [DOWN, ENTER];
      break;
    }
    case MenuPropertie.PRODUCT: {
      menu = [ENTER];
      break;
    }
  }
  return menu;
}

export function menu(aggregate: MenuPropertie, menuDdd: DDD): string[] {
  let menu = menuAggregate(aggregate);
  const moreServices = [...menu, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER];
  switch (menuDdd) {
    case DDD.APPLICATION_COMMAND: {
      menu = [...menu, ENTER];
      break;
    }
    case DDD.APPLICATION_QUERY: {
      menu = [...menu, DOWN, ENTER];
      break;
    }
    case DDD.APPLICATION_RESPONSE: {
      menu = [...moreServices, DOWN, DOWN, DOWN, DOWN, ENTER];
      break;
    }
    case DDD.APPLICATION_INDEX: {
      menu = [...moreServices, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER];
      break;
    }
    case DDD.DOMAIN_AGGREGATE: {
      menu = [...moreServices, DOWN, DOWN, DOWN, ENTER];
      break;
    }
    case DDD.DOMAIN_EVENT: {
      menu = [...menu, DOWN, DOWN, DOWN, ENTER];
      break;
    }
    case DDD.DOMAIN_PROPERTIE: {
      menu = [...moreServices, DOWN, ENTER];
      break;
    }
    case DDD.INFRASTRUCTURE_EVENT: {
      menu = [...menu, DOWN, DOWN, ENTER];
      break;
    }
    case DDD.INFRASTRUCTURE_EVENT_INDEX: {
      menu = [...moreServices, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER];
      break;
    }
    case DDD.INFRASTRUCTURE_GRAPH_QL: {
      menu = [...moreServices, ENTER];
      break;
    }
    case DDD.INFRASTRUCTURE_REPOSITORY: {
      menu = [...moreServices, DOWN, DOWN, ENTER];
      break;
    }
    case DDD.INT_PROJET: {
      menu = [...menu, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER];
      break;
    }
    case DDD.APP_CRUD: {
      menu = [...menu, DOWN, DOWN, DOWN, DOWN, ENTER];
      break;
    }
  }

  return menu;
}
