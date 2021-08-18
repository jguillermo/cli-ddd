import { ENTER, menuAggregate, MenuPropertie, readRender, readSnapShot, removeRender, run, UP } from './load-cmd';

const PATH_ROOT = '../';
const MENU_USER = menuAggregate(MenuPropertie.USER);
describe('firebase firestore', () => {
  beforeEach(() => {
    removeRender(PATH_ROOT + '/.firebaserc');
    removeRender(PATH_ROOT + '/firebase.json');
    removeRender(PATH_ROOT + '/firestore.indexes.json');
    removeRender(PATH_ROOT + '/firestore.rules');
  });
  test('copy 4 files firestore', async () => {
    await run([...MENU_USER, UP, ENTER]);

    const renderFirebaserc = readRender(PATH_ROOT + '/.firebaserc');
    const renderFirebaseJson = readRender(PATH_ROOT + '/firebase.json');
    const renderFirestoreIndexesJson = readRender(PATH_ROOT + '/firestore.indexes.json');
    const renderFirestoreRules = readRender(PATH_ROOT + '/firestore.rules');

    const snapFirebaserc = readSnapShot('firestore/firebaserc.txt');
    const snapFirebaseJson = readSnapShot('firestore/firebase.json.txt');
    const snapFirestoreIndexesJson = readSnapShot('firestore/firestore.indexes.json.txt');
    const snapFirestoreRules = readSnapShot('firestore/firestore.rules.txt');

    expect(renderFirebaserc).toEqual(snapFirebaserc);
    expect(renderFirebaseJson).toEqual(snapFirebaseJson);
    expect(renderFirestoreIndexesJson).toEqual(snapFirestoreIndexesJson);
    expect(renderFirestoreRules).toEqual(snapFirestoreRules);
  });
  afterAll(() => {
    removeRender(PATH_ROOT + '/.firebaserc');
    removeRender(PATH_ROOT + '/firebase.json');
    removeRender(PATH_ROOT + '/firestore.indexes.json');
    removeRender(PATH_ROOT + '/firestore.rules');
  });
});
