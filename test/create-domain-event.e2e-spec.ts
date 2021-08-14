import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run, SPACE } from './load-cmd';

const PATH_USER_DOMAIN = 'src/user/domain';
describe('event User', () => {
  beforeEach(() => {
    cleanRender();
  });
  describe('generate event User', () => {
    test('empty', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, ENTER, 'created', ENTER, ENTER, SPACE, DOWN, SPACE, ENTER]);
      const renderEvent = readRender(PATH_USER_DOMAIN + '/user-created.event.ts');
      const snapEvent = readSnapShot('user-domain-event/empty.txt');
      expect(renderEvent).toEqual(snapEvent);
    });

    test('all propertie', async () => {
      await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, ENTER, 'created', ENTER, ENTER, ENTER]);
      const renderEvent = readRender(PATH_USER_DOMAIN + '/user-created.event.ts');
      const snapEvent = readSnapShot('user-domain-event/all.txt');
      expect(renderEvent).toEqual(snapEvent);
    });
  });
});
