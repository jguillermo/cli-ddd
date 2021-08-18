import { cleanRender, DDD, ENTER, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_DOMAIN = 'src/user/domain';
const SNAP_PATH_USER_DOMAIN = '/user/domain';
const MENU = menu(MenuPropertie.USER, DDD.DOMAIN_PROPERTIE);
describe('User domain Properties', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('render propertie User', () => {
    test('empty', async () => {
      await run([...MENU, ENTER]);
      const renderId = readRender(PATH_USER_DOMAIN + '/user-id.ts');
      const renderName = readRender(PATH_USER_DOMAIN + '/user-name.ts');

      const snapId = readSnapShot(SNAP_PATH_USER_DOMAIN + '/properties/id.txt');
      const snapName = readSnapShot(SNAP_PATH_USER_DOMAIN + '/properties/name.txt');

      expect(renderId).toEqual(snapId);
      expect(renderName).toEqual(snapName);
    });
  });
});
