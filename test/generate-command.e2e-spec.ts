import { cleanRender, DOWN, ENTER, readRender, run } from './load-cmd';

const PATH_USER_APPLICATION = 'src/user/application';
describe('command service User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate command User', () => {
    test('select 1) Create Command', async () => {
      const result = await run([DOWN, ENTER, ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Command/);
      expect(result).toMatch(/use template/);
    });

    test('input command name correct list properties', async () => {
      const result = await run([DOWN, ENTER, ENTER, DOWN, ENTER, ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Command/);
      expect(result).toMatch(/use template persist/);
      expect(result).toMatch(/COMMAND name persist/);
      expect(result).toMatch(/User properties/);
      expect(result).toMatch(/id/);
      expect(result).toMatch(/name/);
    });
  });

  describe('generate command User Error', () => {
    test('input name error 1 cracrter', async () => {
      const result = await run([DOWN, ENTER, ENTER, ENTER, 'c', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Command/);
      expect(result).toMatch(/COMMAND name must be at least 3 letters/);
    });

    test('input name error caracteres no permitidos', async () => {
      const result = await run([DOWN, ENTER, ENTER, ENTER, 'Create-User', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Command/);
      expect(result).toMatch(/only caracters de a la a-z A-Z/);
    });
  });

  describe('render command create User', () => {
    test('service -> select template create', async () => {
      await run([DOWN, ENTER, ENTER, ENTER, 'create', ENTER, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + '/create/user-create.service.ts');
      expect(render).toMatch(/export class UserCreateService/);
      expect(render).toMatch(/private repository: UserRepository/);
    });

    test('command -> select template persist', async () => {
      await run([DOWN, ENTER, ENTER, DOWN, ENTER, 'create', ENTER, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + '/create/user-create.command.ts');
      expect(render).toMatch(/export class UserCreateCommand/);
    });

    test('handler -> select template create', async () => {
      await run([DOWN, ENTER, ENTER, DOWN, ENTER, 'create', ENTER, ENTER]);
      const render = readRender(PATH_USER_APPLICATION + '/create/user-create.handler.ts');
      expect(render).toMatch(/CommandHandler\(UserCreateCommand\)/);
      expect(render).toMatch(/export class UserCreateHandler/);
      expect(render).toMatch(/implements ICommandHandler<UserCreateCommand>/);
      expect(render).toMatch(/private service: UserCreateService/);
      expect(render).toMatch(/async execute\(command: UserCreateCommand\)/);
      expect(render).toMatch(/const id = new UserId\(command\.id\)/);
      expect(render).toMatch(/const name = new UserName\(command\.name\)/);
    });
  });
});
