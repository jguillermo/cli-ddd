import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run, UP } from './load-cmd';

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

  describe('generate query User Error', () => {
    test('input name error 1 cracrter', async () => {
      const result = await run([DOWN, ENTER, DOWN, ENTER, ENTER, 'c', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/QUERY name must be at least 3 letters/);
    });

    test('input name error caracteres no permitidos', async () => {
      const result = await run([DOWN, ENTER, DOWN, ENTER, ENTER, 'Create-User', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/only caracters de a la a-z A-Z/);
    });
  });

  describe('render template', () => {
    test('findById', async () => {
      await run([DOWN, ENTER, DOWN, ENTER, DOWN, ENTER, ENTER, ENTER]);

      const renderDto = readRender(PATH_USER_APPLICATION + '/find-by-id/user-find-by-id.dto.ts');
      const renderHandler = readRender(PATH_USER_APPLICATION + '/find-by-id/user-find-by-id.handler.ts');
      const renderService = readRender(PATH_USER_APPLICATION + '/find-by-id/user-find-by-id.service.ts');

      const snapDto = readSnapShot('user-query-find-by-id/dto.txt');
      const snapHandler = readSnapShot('user-query-find-by-id/handler.txt');
      const snapService = readSnapShot('user-query-find-by-id/service.txt');

      expect(renderDto).toEqual(snapDto);
      expect(renderHandler).toEqual(snapHandler);
      expect(renderService).toEqual(snapService);
    });

    test('list', async () => {
      await run([DOWN, ENTER, DOWN, ENTER, UP, ENTER, ENTER, ENTER]);

      const renderDto = readRender(PATH_USER_APPLICATION + '/list/user-list.dto.ts');
      const renderHandler = readRender(PATH_USER_APPLICATION + '/list/user-list.handler.ts');
      const renderService = readRender(PATH_USER_APPLICATION + '/list/user-list.service.ts');

      const snapDto = readSnapShot('user-query-list/dto.txt');
      const snapHandler = readSnapShot('user-query-list/handler.txt');
      const snapService = readSnapShot('user-query-list/service.txt');

      expect(renderDto).toEqual(snapDto);
      //expect(renderHandler).toEqual(snapHandler);
      //expect(renderService).toEqual(snapService);
    });
  });
});
