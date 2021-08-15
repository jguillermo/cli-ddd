import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run } from './load-cmd';

const PATH_USER_INFRASTRUCTURE = 'src/user/infrastructure/graph-ql';
describe('App User Graph QL', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('generate App GraphQL User', async () => {
    await run([DOWN, ENTER, DOWN, DOWN, ENTER]);
    const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/user.type.ts');
    const renderResolver = readRender(PATH_USER_INFRASTRUCTURE + '/user.resolver.ts');
    const snapAggregate = readSnapShot('user-app/type.txt');
    const snapResolver = readSnapShot('user-app/resolver.txt');
    expect(renderAggregate).toEqual(snapAggregate);
    expect(renderResolver).toEqual(snapResolver);
  });
});
