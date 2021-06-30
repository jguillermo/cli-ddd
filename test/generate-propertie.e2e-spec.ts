import { cleanRender, DOWN, ENTER, readRender, run } from './load-cmd';

const PATH_USER_APPLICATION = 'src/user/domain';

const KEY_PRESS = [DOWN, ENTER, DOWN, DOWN, ENTER, ENTER];

describe('command service User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('render propertie User', () => {
    test('user Id', async () => {
      await run(KEY_PRESS);
      const renderId = readRender(PATH_USER_APPLICATION + '/user-id.ts');
      expect(renderId).toMatch(/export class UserId extends IdType/);

      const renderName = readRender(PATH_USER_APPLICATION + '/user-name.ts');
      expect(renderName).toMatch(/export class UserName extends StringType/);
    });
  });
});
