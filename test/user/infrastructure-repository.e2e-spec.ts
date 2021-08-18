import { cleanRender, DDD, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER = 'src/user';
const SNAP_PATH_USER_INFRASTRUCTURE = '/user/infrastructure';
const SNAP_PATH_USER_DOMAIN = '/user/domain';
const MENU = menu(MenuPropertie.USER, DDD.INFRASTRUCTURE_REPOSITORY);
describe('User infrastructure Repository', () => {
  beforeEach(() => {
    cleanRender();
  });
  test('domain and firestore repository', async () => {
    await run([...MENU]);

    const renderDomainRepository = readRender(PATH_USER + '/domain/user.repository.ts');
    const renderRepositoryDao = readRender(PATH_USER + '/infrastructure/persistence/user.dao.ts');
    const renderRepositoryFirestore = readRender(PATH_USER + '/infrastructure/persistence/user-firestore.repository.ts');

    const snapDomainRepository = readSnapShot(SNAP_PATH_USER_DOMAIN + '/repository/repository.txt');
    const snapRepositoryDao = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/repository/firestore-dao.txt');
    const snapRepositoryFirestore = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/repository/firestore.txt');

    expect(renderDomainRepository).toEqual(snapDomainRepository);
    expect(renderRepositoryDao).toEqual(snapRepositoryDao);
    expect(renderRepositoryFirestore).toEqual(snapRepositoryFirestore);
  });
});
