import { cleanRender, DOWN, ENTER, readRender, run } from './load-cmd';

const PATH_USER_APPLICATION = 'src/user/domain';
describe('command service User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('render propertie User', () => {
    test('user Id', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, ENTER, ENTER]);
      const renderId = readRender(PATH_USER_APPLICATION + '/user-id.ts');
      expect(renderId).toMatch(/export class UserId extends IdType/);

      const renderName = readRender(PATH_USER_APPLICATION + '/user-name.ts');
      expect(renderName).toMatch(/export class UserName extends StringType/);
    });
  });
});
