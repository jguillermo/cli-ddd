import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run } from './load-cmd';

const PATH_USER_INFRASTRUCTURE = 'src/user/infrastructure/graph-ql';
describe('App User Graph QL', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('generate App GraphQL User', async () => {
    await run([DOWN, ENTER, DOWN, DOWN, ENTER]);
    const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/user.type.ts');
    const snapAggregate = readSnapShot('user-app/type.txt');
    expect(renderAggregate).toEqual(snapAggregate);
  });
});
