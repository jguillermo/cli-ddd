import { cleanRender, DOWN, ENTER, readRender, run } from './load-cmd';

const PATH_USER_APPLICATION = 'src/user/application/';
describe('response User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate response User', () => {
    test('aggregate', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + 'user.response.ts');
      expect(render).toMatch(/import { User } from/);
      expect(render).toMatch(/export class UserResponse/);
      expect(render).toMatch(/constructor\(public id: string, public name: string\)/);
      expect(render).toMatch(/static fromAggregate\(user: User\)/);
      expect(render).toMatch(/return new UserResponse\(user\.id\.value, user\.name\.value\)/);
    });
    test('list aggregate', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + 'list-user.response.ts');
      expect(render).toMatch(/import { UserResponse } from/);
      expect(render).toMatch(/export class ListUserResponse/);
      expect(render).toMatch(/public list: UserResponse\[]/);
      expect(render).toMatch(/constructor\(list: UserResponse\[]\)/);
    });
  });
});
