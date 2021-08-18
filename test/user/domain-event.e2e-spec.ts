import { cleanRender, DDD, DOWN, ENTER, menu, MenuPropertie, readRender, readSnapShot, run, SPACE } from '../load-cmd';

const PATH_USER_DOMAIN = 'src/user/domain';
const SNAP_PATH_USER_DOMAIN = '/user/domain';
const MENU = menu(MenuPropertie.USER, DDD.DOMAIN_EVENT);
describe('User domain Event', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate event User', () => {
    test('empty', async () => {
      await run([...MENU, 'created', ENTER, ENTER, SPACE, DOWN, SPACE, ENTER]);
      const renderEvent = readRender(PATH_USER_DOMAIN + '/user-created.event.ts');
      const snapEvent = readSnapShot(SNAP_PATH_USER_DOMAIN + '/event/created-empty.txt');
      expect(renderEvent).toEqual(snapEvent);
    });

    test('all propertie', async () => {
      await run([...MENU, 'created', ENTER, ENTER, ENTER]);
      const renderEvent = readRender(PATH_USER_DOMAIN + '/user-created.event.ts');
      const snapEvent = readSnapShot(SNAP_PATH_USER_DOMAIN + '/event/created.txt');
      expect(renderEvent).toEqual(snapEvent);
    });
  });
});
