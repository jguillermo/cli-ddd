import { cleanRender, DOWN, ENTER, readRender, readSnapShot, run } from './load-cmd';

const PATH_USER = 'src/user';
describe('Repository User', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('domain and firestore repository', async () => {
    await run([DOWN, ENTER, DOWN, DOWN, DOWN, DOWN, DOWN, DOWN, ENTER]);

    const renderDomainRepository = readRender(PATH_USER + '/domain/user.repository.ts');
    const renderRepositoryDao = readRender(PATH_USER + '/infrastructure/persistence/user.dao.ts');
    const renderRepositoryFirestore = readRender(PATH_USER + '/infrastructure/persistence/user-firestore.repository.ts');

    const snapDomainRepository = readSnapShot('user-repository/repository.txt');
    const snapRepositoryDao = readSnapShot('user-repository/firestore-dao.txt');
    const snapRepositoryFirestore = readSnapShot('user-repository/firestore.txt');

    expect(renderDomainRepository).toEqual(snapDomainRepository);
    expect(renderRepositoryDao).toEqual(snapRepositoryDao);
    expect(renderRepositoryFirestore).toEqual(snapRepositoryFirestore);
  });
});
