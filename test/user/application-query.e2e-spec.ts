import { cleanRender, DDD, DOWN, ENTER, menu, MenuPropertie, readRender, readSnapShot, run, UP } from '../load-cmd';

const PATH_USER_APPLICATION = 'src/user/application';
const SNAP_PATH_USER_APPLICATION = '/user/application';
const MENU = menu(MenuPropertie.USER, DDD.APPLICATION_QUERY);
describe('User application Query', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate query User', () => {
    test('select 1) Create Query', async () => {
      const result = await run([...MENU, ENTER, 'testQuery', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/use template none/);
      expect(result).toMatch(/QUERY name testQuery/);
      expect(result).toMatch(/User properties/);
    });
  });

  describe('generate query User Error', () => {
    test('input name error 1 cracrter', async () => {
      const result = await run([...MENU, ENTER, 'c', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/QUERY name must be at least 3 letters/);
    });

    test('input name error caracteres no permitidos', async () => {
      const result = await run([...MENU, ENTER, 'Create-User', ENTER]);
      expect(result).toMatch(/Select aggregate User/);
      expect(result).toMatch(/What do you want to generate in User\? Create Query/);
      expect(result).toMatch(/only caracters de a la a-z A-Z/);
    });
  });

  describe('render template', () => {
    test('findById', async () => {
      await run([...MENU, DOWN, ENTER, ENTER, ENTER]);

      const renderDto = readRender(PATH_USER_APPLICATION + '/find-by-id/user-find-by-id.dto.ts');
      const renderHandler = readRender(PATH_USER_APPLICATION + '/find-by-id/user-find-by-id.handler.ts');
      const renderService = readRender(PATH_USER_APPLICATION + '/find-by-id/user-find-by-id.service.ts');

      const snapDto = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/find-by-id/dto.txt');
      const snapHandler = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/find-by-id/handler.txt');
      const snapService = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/find-by-id/service.txt');

      expect(renderDto).toEqual(snapDto);
      expect(renderHandler).toEqual(snapHandler);
      expect(renderService).toEqual(snapService);

      const renderIndex = readRender(PATH_USER_APPLICATION + '/index.ts');
      const snapIndex = readSnapShot(SNAP_PATH_USER_APPLICATION + '/index/find-by-id.txt');
      expect(renderIndex).toEqual(snapIndex);
    });

    test('list', async () => {
      await run([...MENU, UP, ENTER, ENTER, ENTER]);

      const renderDto = readRender(PATH_USER_APPLICATION + '/list/user-list.dto.ts');
      const renderHandler = readRender(PATH_USER_APPLICATION + '/list/user-list.handler.ts');
      const renderService = readRender(PATH_USER_APPLICATION + '/list/user-list.service.ts');

      const snapDto = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/list/dto.txt');
      const snapHandler = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/list/handler.txt');
      const snapService = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/list/service.txt');

      expect(renderDto).toEqual(snapDto);
      expect(renderHandler).toEqual(snapHandler);
      expect(renderService).toEqual(snapService);
    });

    test('none', async () => {
      await run([...MENU, ENTER, 'none', ENTER, ENTER]);

      const renderDto = readRender(PATH_USER_APPLICATION + '/none/user-none.dto.ts');
      const renderHandler = readRender(PATH_USER_APPLICATION + '/none/user-none.handler.ts');
      const renderService = readRender(PATH_USER_APPLICATION + '/none/user-none.service.ts');

      const snapDto = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/none/dto.txt');
      const snapHandler = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/none/handler.txt');
      const snapService = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/none/service.txt');

      expect(renderDto).toEqual(snapDto);
      expect(renderHandler).toEqual(snapHandler);
      expect(renderService).toEqual(snapService);
    });
  });
});
