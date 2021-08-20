import { cleanRender, copyfromSnapToRender, DDD, ENTER, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_INFRASTRUCTURE = 'src/user/infrastructure';
const SNAP_PATH_USER_INFRASTRUCTURE = '/user/infrastructure';
const MENU = menu(MenuPropertie.USER, DDD.INFRASTRUCTURE_EVENT_INDEX);
describe('User infrastructure event index', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('no existe event', async () => {
    await run([...MENU]);
    const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/event/index.ts');
    const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/event/index/empty.txt');
    expect(renderAggregate).toEqual(snapAggregate);
  });
  test('event created', async () => {
    copyfromSnapToRender(SNAP_PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-created.txt', 'src/user/infrastructure/event/resource-on-user-created.ts');
    await run([...MENU]);
    const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/event/index.ts');
    const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/event/index/one-event.txt');
    expect(renderAggregate).toEqual(snapAggregate);
  });
});
