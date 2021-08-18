import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run, SPACE } from '../load-cmd';

const PATH_USER_DOMAIN = 'src/user/domain';
const SNAP_PATH_USER_DOMAIN = '/user/domain';
describe('User domain Aggregate', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate aggregate User', () => {
    test('empty', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, SPACE, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const snapAggregate = readSnapShot(SNAP_PATH_USER_DOMAIN + '/aggregate/empty.txt');
      expect(renderAggregate).toEqual(snapAggregate);
    });

    test('create', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const renderEvent = readRender(PATH_USER_DOMAIN + '/user-created.event.ts');

      const snapAggregate = readSnapShot(SNAP_PATH_USER_DOMAIN + '/aggregate/create.txt');
      const snapEvent = readSnapShot(SNAP_PATH_USER_DOMAIN + '/event/created.txt');

      expect(renderAggregate).toEqual(snapAggregate);
      expect(renderEvent).toEqual(snapEvent);
    });

    test('update', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, SPACE, DOWN, SPACE, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const renderEvent = readRender(PATH_USER_DOMAIN + '/user-updated.event.ts');

      const snapAggregate = readSnapShot(SNAP_PATH_USER_DOMAIN + '/aggregate/update.txt');
      const snapEvent = readSnapShot(SNAP_PATH_USER_DOMAIN + '/event/updated.txt');

      expect(renderAggregate).toEqual(snapAggregate);
      expect(renderEvent).toEqual(snapEvent);
    });

    test('delete', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, SPACE, DOWN, DOWN, SPACE, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const renderEvent = readRender(PATH_USER_DOMAIN + '/user-deleted.event.ts');

      const snapAggregate = readSnapShot(SNAP_PATH_USER_DOMAIN + '/aggregate/delete.txt');
      const snapEvent = readSnapShot(SNAP_PATH_USER_DOMAIN + '/event/deleted.txt');

      expect(renderAggregate).toEqual(snapAggregate);
      expect(renderEvent).toEqual(snapEvent);
    });
    test('complete', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER, DOWN, SPACE, DOWN, SPACE, ENTER]);
      const renderAggregate = readRender(PATH_USER_DOMAIN + '/user.ts');
      const renderEventCreated = readRender(PATH_USER_DOMAIN + '/user-created.event.ts');
      const renderEventUpdated = readRender(PATH_USER_DOMAIN + '/user-updated.event.ts');
      const renderEventDeleted = readRender(PATH_USER_DOMAIN + '/user-deleted.event.ts');

      const snapAggregate = readSnapShot(SNAP_PATH_USER_DOMAIN + '/aggregate/complete.txt');
      const snapEventCreated = readSnapShot(SNAP_PATH_USER_DOMAIN + '/event/created.txt');
      const snapEventUpdated = readSnapShot(SNAP_PATH_USER_DOMAIN + '/event/updated.txt');
      const snapEventDeleted = readSnapShot(SNAP_PATH_USER_DOMAIN + '/event/deleted.txt');

      expect(renderAggregate).toEqual(snapAggregate);
      expect(renderEventCreated).toEqual(snapEventCreated);
      expect(renderEventUpdated).toEqual(snapEventUpdated);
      expect(renderEventDeleted).toEqual(snapEventDeleted);
    });
  });
});
