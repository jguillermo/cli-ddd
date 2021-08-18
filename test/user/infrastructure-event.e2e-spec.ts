import { cleanRender, copyfromSnapToRender, DDD, ENTER, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_INFRASTRUCTURE = 'src/user/infrastructure';
const SNAP_PATH_USER_INFRASTRUCTURE = '/user/infrastructure';
const MENU = menu(MenuPropertie.USER, DDD.INFRASTRUCTURE_EVENT);
describe('User infrastructure event', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('no existe event', async () => {
    const result = await run([...MENU]);
    expect(result).toMatch(/No exist Events/);
  });
  test('event created', async () => {
    copyfromSnapToRender(SNAP_PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-created.txt', 'src/user/domain/user-created.event.ts');
    await run([...MENU, ENTER, ENTER]);
    const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-created.ts');
    const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-created.txt');

    expect(renderAggregate).toEqual(snapAggregate);
  });
});
