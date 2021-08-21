import { cleanRender, DDD, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_INFRASTRUCTURE = 'src/user/infrastructure';
const PATH_USER_TEST = 'test/user/';

const SNAP_PATH_USER_INFRASTRUCTURE = '/user/infrastructure';
const SNAP_PATH_USER_TEST = '/user/test';

const MENU = menu(MenuPropertie.USER, DDD.INFRASTRUCTURE_GRAPH_QL);
describe('User infrastructure GraphQL', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('generate App GraphQL User', async () => {
    await run([...MENU]);
    const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/graph-ql/user.type.ts');
    const renderResolver = readRender(PATH_USER_INFRASTRUCTURE + '/graph-ql/user.resolver.ts');

    const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/graph-ql/type.txt');
    const snapResolver = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/graph-ql/resolver.txt');
    expect(renderAggregate).toEqual(snapAggregate);
    expect(renderResolver).toEqual(snapResolver);
  });

  test('generate App GraphQL User test', async () => {
    await run([...MENU]);
    const renderTestDelete = readRender(PATH_USER_TEST + '/graph-ql/user-delete.e2e-spec.ts');

    const snapTestDelete = readSnapShot(SNAP_PATH_USER_TEST + '/graph-ql/delete.txt');
    expect(renderTestDelete).toEqual(snapTestDelete);
  });
});
