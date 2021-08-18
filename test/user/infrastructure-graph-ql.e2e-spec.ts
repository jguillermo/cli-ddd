import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_INFRASTRUCTURE = 'src/user/infrastructure/graph-ql';
const SNAP_PATH_USER_INFRASTRUCTURE = '/user/infrastructure';
describe('User infrastructure GraphQL', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('generate App GraphQL User', async () => {
    await run([DOWN, ENTER, DOWN, DOWN, ENTER]);
    const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/user.type.ts');
    const renderResolver = readRender(PATH_USER_INFRASTRUCTURE + '/user.resolver.ts');
    const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/graph-ql/type.txt');
    const snapResolver = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/graph-ql/resolver.txt');
    expect(renderAggregate).toEqual(snapAggregate);
    expect(renderResolver).toEqual(snapResolver);
  });
});
