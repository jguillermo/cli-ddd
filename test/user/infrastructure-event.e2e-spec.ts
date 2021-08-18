import { cleanRender, copyfromSnapToRender, DOWN, ENTER, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_INFRASTRUCTURE_EVENT = 'src/user/infrastructure/event';
const SNAP_PATH_USER_INFRASTRUCTURE = '/user/infrastructure';
describe('User infrastructure event', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('no existe event', async () => {
    const result = await run([DOWN, ENTER, DOWN, DOWN, DOWN, ENTER]);
    expect(result).toMatch(/No exist Events/);
  });
  test('event created', async () => {
    copyfromSnapToRender(SNAP_PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-created.txt', 'src/user/domain/user-created.event.ts');
    await run([DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, ENTER, ENTER]);
    const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE_EVENT + '/resource-on-user-created.ts');
    const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-created.txt');

    expect(renderAggregate).toEqual(snapAggregate);
  });
});
