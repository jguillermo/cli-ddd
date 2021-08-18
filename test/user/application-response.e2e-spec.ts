import { cleanRender, DDD, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_APPLICATION = 'src/user/application/';
const SNAP_PATH_USER_APPLICATION = '/user/application';
const MENU = menu(MenuPropertie.USER, DDD.APPLICATION_RESPONSE);
describe('User application Response', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate response User', () => {
    test('aggregate and list', async () => {
      await run(MENU);

      const renderAggregate = readRender(PATH_USER_APPLICATION + '/user.response.ts');
      const renderListAggregate = readRender(PATH_USER_APPLICATION + '/list-user.response.ts');

      const snapAggregate = readSnapShot(SNAP_PATH_USER_APPLICATION + '/response/aggregate.txt');
      const snapListAggregate = readSnapShot(SNAP_PATH_USER_APPLICATION + '/response/list-aggregate.txt');

      expect(renderAggregate).toEqual(snapAggregate);
      expect(renderListAggregate).toEqual(snapListAggregate);
    });
  });
});
