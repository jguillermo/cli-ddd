import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run } from './load-cmd';

const PATH_USER_DOMAIN = 'src/user/domain';

describe('command service User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('render propertie User', () => {
    test('Id Name', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, ENTER]);
      const renderId = readRender(PATH_USER_DOMAIN + '/user-id.ts');
      const renderName = readRender(PATH_USER_DOMAIN + '/user-name.ts');

      const snapId = readSnapShot('user-properties/id.txt');
      const snapName = readSnapShot('user-properties/name.txt');

      expect(renderId).toEqual(snapId);
      expect(renderName).toEqual(snapName);
    });
  });
});
