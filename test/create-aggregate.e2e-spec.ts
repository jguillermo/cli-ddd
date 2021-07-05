import { cleanRender, DOWN, ENTER, readRender, run } from './load-cmd';

const PATH_USER_APPLICATION = 'src/user/domain/user.ts';
describe('aggregate User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate aggregate User', () => {
    test('generate', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, ENTER]);
      const render = readRender(PATH_USER_APPLICATION);
      expect(render).toMatch(/import { UserId } from/);
      expect(render).toMatch(/import { UserName } from/);
      expect(render).toMatch(/export class User {/);
      expect(render).toMatch(/constructor\(private _id: UserId, private _name: UserName\)/);
      expect(render).toMatch(/static create\(id: UserId, name: UserName\)/);
      expect(render).toMatch(/get id\(\): UserId/);
      expect(render).toMatch(/get name\(\): UserName/);
    });
  });
});
