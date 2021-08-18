import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_APPLICATION = 'src/user/application/';
const SNAP_PATH_USER_APPLICATION = '/user/application';
describe('User application Response', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate response User', () => {
    test('aggregate and list', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER]);

      const renderAggregate = readRender(PATH_USER_APPLICATION + '/user.response.ts');
      const renderListAggregate = readRender(PATH_USER_APPLICATION + '/list-user.response.ts');

      const snapAggregate = readSnapShot(SNAP_PATH_USER_APPLICATION + '/response/aggregate.txt');
      const snapListAggregate = readSnapShot(SNAP_PATH_USER_APPLICATION + '/response/list-aggregate.txt');

      expect(renderAggregate).toEqual(snapAggregate);
      expect(renderListAggregate).toEqual(snapListAggregate);
    });
  });
});
