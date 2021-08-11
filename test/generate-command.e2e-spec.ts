import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run } from './load-cmd';

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

  describe('render', () => {
    test('template persist', async () => {
      await run([DOWN, ENTER, ENTER, DOWN, ENTER, ENTER, ENTER]);
      const renderDto = readRender(PATH_USER_APPLICATION + '/persist/user-persist.dto.ts');
      const renderHandler = readRender(PATH_USER_APPLICATION + '/persist/user-persist.handler.ts');
      const renderService = readRender(PATH_USER_APPLICATION + '/persist/user-persist.service.ts');

      const snapDto = readSnapShot('user-command-persist/dto.txt');
      const snapHandler = readSnapShot('user-command-persist/handler.txt');
      const snapService = readSnapShot('user-command-persist/service.txt');

      expect(renderDto).toEqual(snapDto);
      expect(renderHandler).toEqual(snapHandler);
      expect(renderService).toEqual(snapService);
    });
  });
});
