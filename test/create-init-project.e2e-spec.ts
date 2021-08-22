import { DDD, menu, MenuPropertie, removeRender, renderExist, run } from './load-cmd';

const PATH_ROOT = '../';
const MENU = menu(MenuPropertie.USER, DDD.INT_PROJET);

function cleanRender() {
  removeRender(PATH_ROOT + '/.firebaserc');
  removeRender(PATH_ROOT + '/firebase.json');
  removeRender(PATH_ROOT + '/firestore.indexes.json');
  removeRender(PATH_ROOT + '/firestore.rules');
  removeRender(PATH_ROOT + '/test/testing-e2e-module.ts');
  removeRender(PATH_ROOT + '/src/share');
}

describe('init project', () => {
  beforeAll(async () => {
    cleanRender();
    await run([...MENU]);
  });
  test('firestore', async () => {
    expect(renderExist(PATH_ROOT + '/.firebaserc')).toEqual(true);
    expect(renderExist(PATH_ROOT + '/firebase.json')).toEqual(true);
    expect(renderExist(PATH_ROOT + '/firestore.indexes.json')).toEqual(true);
    expect(renderExist(PATH_ROOT + '/firestore.rules')).toEqual(true);
  });
  test('test e2e module', async () => {
    expect(renderExist(PATH_ROOT + '/test/testing-e2e-module.ts')).toEqual(true);
  });
  test('module Share', async () => {
    expect(renderExist(PATH_ROOT + '/src/share/share.module.ts')).toEqual(true);
  });

  afterAll(() => {
    cleanRender();
  });
});
