import { cleanRender, DOWN, ENTER, readRender, run, UP } from './load-cmd';

const PATH_USER_APPLICATION = 'src/user/application';
describe('query service User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate query User', () => {
    test('select 1) Create Query', async () => {
      const result = await run([DOWN, ENTER, DOWN, ENTER, ENTER, 'testQuery', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/use template none/);
      expect(result).toMatch(/QUERY name testQuery/);
      expect(result).toMatch(/User properties/);
    });
  });

  describe.skip('generate query User Error', () => {
    test('input name error 1 cracrter', async () => {
      const result = await run([DOWN, ENTER, DOWN, ENTER, 'c', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/QUERY name must be at least 3 letters/);
    });

    test('input name error caracteres no permitidos', async () => {
      const result = await run([DOWN, ENTER, DOWN, ENTER, 'Create-User', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/only caracters de a la a-z A-Z/);
    });
  });

  describe.skip('render query list User', () => {
    test('service -> select template list', async () => {
      await run([DOWN, ENTER, DOWN, ENTER, 'list', ENTER, ENTER, UP, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + '/list/user-list.service.ts');
      expect(render).toMatch(/export class UserListService/);
      expect(render).toMatch(/private repository: UserRepository/);
      expect(render).toMatch(/const listUser = await this.repository.find\(\)/);
    });

    test('query -> select template list', async () => {
      await run([DOWN, ENTER, DOWN, ENTER, 'list', ENTER, ENTER, UP, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + '/list/user-list.query.ts');
      expect(render).toMatch(/export class UserListQuery/);
    });

    test('handler -> select template list', async () => {
      await run([DOWN, ENTER, DOWN, ENTER, 'list', ENTER, ENTER, UP, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + '/list/user-list.handler.ts');
      expect(render).toMatch(/QueryHandler\(UserListQuery\)/);
      expect(render).toMatch(/export class UserListHandler/);
      expect(render).toMatch(/implements IQueryHandler<UserListQuery>/);
      expect(render).toMatch(/private service: UserListService/);
      expect(render).toMatch(/async execute\(query: UserListQuery\)/);
      expect(render).toMatch(/const id = new UserId\(query\.id\)/);
      expect(render).toMatch(/const name = new UserName\(query\.name\)/);
    });
  });
});
