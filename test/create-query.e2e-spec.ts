import { cleanRender, DOWN, ENTER, readRender, run, UP } from './load-cmd';

const PATH_USER_APPLICATION = 'src/user/application';
describe('query service User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate query User', () => {
    test('select 1) Create Query', async () => {
      const result = await run([DOWN, ENTER, DOWN, ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/QUERY name/);
    });

    test('input query name correct list properties', async () => {
      const result = await run([DOWN, ENTER, DOWN, ENTER, 'list', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/QUERY name list/);
      expect(result).toMatch(/User properties/);
      expect(result).toMatch(/id/);
      expect(result).toMatch(/name/);
    });

    test('input query name correct -> view list template', async () => {
      const result = await run([DOWN, ENTER, DOWN, ENTER, 'list', ENTER, ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/QUERY name list/);
      expect(result).toMatch(/User properties User:id, User:name/);
      expect(result).toMatch(/use template/);
      expect(result).toMatch(/entity/);
      expect(result).toMatch(/list/);
      expect(result).toMatch(/none/);
    });

    test('input query name correct -> select template none', async () => {
      const result = await run([DOWN, ENTER, DOWN, ENTER, 'list', ENTER, ENTER, ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/QUERY name list/);
      expect(result).toMatch(/User properties User:id, User:name/);
      expect(result).toMatch(/use template none/);
      expect(result).toMatch(/\[created\] /);
    });
  });

  describe('generate query User Error', () => {
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

  describe('render query list User', () => {
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
