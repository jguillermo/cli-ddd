import { cleanRender, copyfromSnapToRender, DDD, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_APPLICATION = 'src/user/application';
const SNAP_PATH_USER_APPLICATION = '/user/application';
const MENU = menu(MenuPropertie.USER, DDD.APPLICATION_INDEX);
describe('User application index', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('no existe event', async () => {
    await run([...MENU]);
    const renderAggregate = readRender(PATH_USER_APPLICATION + '/index.ts');
    const snapAggregate = readSnapShot(SNAP_PATH_USER_APPLICATION + '/index/empty.txt');
    expect(renderAggregate).toEqual(snapAggregate);
  });
  test('application created', async () => {
    copyfromSnapToRender(SNAP_PATH_USER_APPLICATION + '/command/persist/handler.txt', PATH_USER_APPLICATION + '/persist/user-persist.handler.ts');
    copyfromSnapToRender(SNAP_PATH_USER_APPLICATION + '/command/persist/service.txt', PATH_USER_APPLICATION + '/persist/user-persist.service.ts');
    await run([...MENU]);
    const renderAggregate = readRender(PATH_USER_APPLICATION + '/index.ts');
    const snapAggregate = readSnapShot(SNAP_PATH_USER_APPLICATION + '/index/one-item.txt');
    expect(renderAggregate).toEqual(snapAggregate);
  });
});
