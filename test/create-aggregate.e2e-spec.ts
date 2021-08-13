import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run, SPACE } from './load-cmd';

const PATH_USER_DOMAIN = 'src/user/domain';
describe('aggregate User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate aggregate User', () => {
    test('empty', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, SPACE, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const snapAggregate = readSnapShot('user-aggregate/empty.txt');
      expect(renderAggregate).toEqual(snapAggregate);
    });

    test('create', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const snapAggregate = readSnapShot('user-aggregate/create.txt');
      expect(renderAggregate).toEqual(snapAggregate);
    });

    test('update', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, SPACE, DOWN, SPACE, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const snapAggregate = readSnapShot('user-aggregate/update.txt');
      expect(renderAggregate).toEqual(snapAggregate);
    });

    test('delete', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, SPACE, DOWN, DOWN, SPACE, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const snapAggregate = readSnapShot('user-aggregate/delete.txt');
      expect(renderAggregate).toEqual(snapAggregate);
    });
    test('complete', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, DOWN, SPACE, DOWN, SPACE, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const snapAggregate = readSnapShot('user-aggregate/complete.txt');
      expect(renderAggregate).toEqual(snapAggregate);
    });
  });
});
