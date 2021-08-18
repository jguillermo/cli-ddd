import { cleanRender, DDD, DOWN, ENTER, menu, MenuPropertie, readRender, readSnapShot, run, UP } from '../load-cmd';

const PATH_USER_APPLICATION = 'src/user/application';
const PATH_USER_COMMAND = 'user/application/command';
const MENU = menu(MenuPropertie.USER, DDD.APPLICATION_COMMAND);
describe('User application Command', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate command User', () => {
    test('select 1) Create Command', async () => {
      const result = await run(MENU);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Command/);
      expect(result).toMatch(/use template/);
    });

    test('input command name correct list properties', async () => {
      const result = await run([...MENU, DOWN, ENTER, ENTER]);
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
      const result = await run([...MENU, ENTER, 'c', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Command/);
      expect(result).toMatch(/COMMAND name must be at least 3 letters/);
    });

    test('input name error caracteres no permitidos', async () => {
      const result = await run([...MENU, ENTER, 'Create-User', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Command/);
      expect(result).toMatch(/only caracters de a la a-z A-Z/);
    });
  });

  describe('render', () => {
    test('template persist', async () => {
      await run([...MENU, DOWN, ENTER, ENTER, ENTER]);
      const renderDto = readRender(PATH_USER_APPLICATION + '/persist/user-persist.dto.ts');
      const renderHandler = readRender(PATH_USER_APPLICATION + '/persist/user-persist.handler.ts');
      const renderService = readRender(PATH_USER_APPLICATION + '/persist/user-persist.service.ts');

      const snapDto = readSnapShot(PATH_USER_COMMAND + '/persist/dto.txt');
      const snapHandler = readSnapShot(PATH_USER_COMMAND + '/persist/handler.txt');
      const snapService = readSnapShot(PATH_USER_COMMAND + '/persist/service.txt');

      expect(renderDto).toEqual(snapDto);
      expect(renderHandler).toEqual(snapHandler);
      expect(renderService).toEqual(snapService);
    });

    test('template delete', async () => {
      await run([...MENU, UP, ENTER, ENTER, ENTER]);
      const renderDto = readRender(PATH_USER_APPLICATION + '/delete/user-delete.dto.ts');
      const renderHandler = readRender(PATH_USER_APPLICATION + '/delete/user-delete.handler.ts');
      const renderService = readRender(PATH_USER_APPLICATION + '/delete/user-delete.service.ts');

      const snapDto = readSnapShot(PATH_USER_COMMAND + '/delete/dto.txt');
      const snapHandler = readSnapShot(PATH_USER_COMMAND + '/delete/handler.txt');
      const snapService = readSnapShot(PATH_USER_COMMAND + '/delete/service.txt');

      expect(renderDto).toEqual(snapDto);
      expect(renderHandler).toEqual(snapHandler);
      expect(renderService).toEqual(snapService);
    });

    test('template none', async () => {
      await run([...MENU, ENTER, 'none', ENTER, ENTER]);
      const renderDto = readRender(PATH_USER_APPLICATION + '/none/user-none.dto.ts');
      const renderHandler = readRender(PATH_USER_APPLICATION + '/none/user-none.handler.ts');
      const renderService = readRender(PATH_USER_APPLICATION + '/none/user-none.service.ts');

      const snapDto = readSnapShot(PATH_USER_COMMAND + '/none/dto.txt');
      const snapHandler = readSnapShot(PATH_USER_COMMAND + '/none/handler.txt');
      const snapService = readSnapShot(PATH_USER_COMMAND + '/none/service.txt');

      expect(renderDto).toEqual(snapDto);
      expect(renderHandler).toEqual(snapHandler);
      expect(renderService).toEqual(snapService);
    });
  });
});
