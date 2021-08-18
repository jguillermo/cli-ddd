import { cleanRender, DDD, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

const PATH_USER_DOMAIN = 'src/user/domain';
const PATH_USER_APPLICATION = 'src/user/application';
const PATH_USER_INFRASTRUCTURE = 'src/user/infrastructure';

const SNAP_PATH_USER_DOMAIN = '/user/domain';
const SNAP_PATH_USER_APPLICATION = '/user/application';
const SNAP_PATH_USER_INFRASTRUCTURE = '/user/infrastructure';
const MENU = menu(MenuPropertie.USER, DDD.APP_CRUD);
describe('User crud', () => {
  beforeAll(async () => {
    cleanRender();
    await run(MENU);
  });
  describe('crud', () => {
    describe('application command', () => {
      test('persist', async () => {
        const renderDto = readRender(PATH_USER_APPLICATION + '/persist/user-persist.dto.ts');
        const renderHandler = readRender(PATH_USER_APPLICATION + '/persist/user-persist.handler.ts');
        const renderService = readRender(PATH_USER_APPLICATION + '/persist/user-persist.service.ts');

        const snapDto = readSnapShot(SNAP_PATH_USER_APPLICATION + '/command/persist/dto.txt');
        const snapHandler = readSnapShot(SNAP_PATH_USER_APPLICATION + '/command/persist/handler.txt');
        const snapService = readSnapShot(SNAP_PATH_USER_APPLICATION + '/command/persist/service.txt');

        expect(renderDto).toEqual(snapDto);
        expect(renderHandler).toEqual(snapHandler);
        expect(renderService).toEqual(snapService);
      });
      test('delete', async () => {
        const renderDto = readRender(PATH_USER_APPLICATION + '/delete/user-delete.dto.ts');
        const renderHandler = readRender(PATH_USER_APPLICATION + '/delete/user-delete.handler.ts');
        const renderService = readRender(PATH_USER_APPLICATION + '/delete/user-delete.service.ts');

        const snapDto = readSnapShot(SNAP_PATH_USER_APPLICATION + '/command/delete/dto.txt');
        const snapHandler = readSnapShot(SNAP_PATH_USER_APPLICATION + '/command/delete/handler.txt');
        const snapService = readSnapShot(SNAP_PATH_USER_APPLICATION + '/command/delete/service.txt');

        expect(renderDto).toEqual(snapDto);
        expect(renderHandler).toEqual(snapHandler);
        expect(renderService).toEqual(snapService);
      });
    });
    describe('application query', () => {
      test('findById', async () => {
        const renderDto = readRender(PATH_USER_APPLICATION + '/find-by-id/user-find-by-id.dto.ts');
        const renderHandler = readRender(PATH_USER_APPLICATION + '/find-by-id/user-find-by-id.handler.ts');
        const renderService = readRender(PATH_USER_APPLICATION + '/find-by-id/user-find-by-id.service.ts');

        const snapDto = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/find-by-id/dto.txt');
        const snapHandler = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/find-by-id/handler.txt');
        const snapService = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/find-by-id/service.txt');

        expect(renderDto).toEqual(snapDto);
        expect(renderHandler).toEqual(snapHandler);
        expect(renderService).toEqual(snapService);
      });
      test('list', async () => {
        const renderDto = readRender(PATH_USER_APPLICATION + '/list/user-list.dto.ts');
        const renderHandler = readRender(PATH_USER_APPLICATION + '/list/user-list.handler.ts');
        const renderService = readRender(PATH_USER_APPLICATION + '/list/user-list.service.ts');

        const snapDto = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/list/dto.txt');
        const snapHandler = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/list/handler.txt');
        const snapService = readSnapShot(SNAP_PATH_USER_APPLICATION + '/query/list/service.txt');

        expect(renderDto).toEqual(snapDto);
        expect(renderHandler).toEqual(snapHandler);
        expect(renderService).toEqual(snapService);
      });
    });

    test('application response', async () => {
      const renderAggregate = readRender(PATH_USER_APPLICATION + '/user.response.ts');
      const renderListAggregate = readRender(PATH_USER_APPLICATION + '/list-user.response.ts');

      const snapAggregate = readSnapShot(SNAP_PATH_USER_APPLICATION + '/response/aggregate.txt');
      const snapListAggregate = readSnapShot(SNAP_PATH_USER_APPLICATION + '/response/list-aggregate.txt');

      expect(renderAggregate).toEqual(snapAggregate);
      expect(renderListAggregate).toEqual(snapListAggregate);
    });

    test('domain properties', async () => {
      const renderId = readRender(PATH_USER_DOMAIN + '/user-id.ts');
      const renderName = readRender(PATH_USER_DOMAIN + '/user-name.ts');

      const snapId = readSnapShot(SNAP_PATH_USER_DOMAIN + '/properties/id.txt');
      const snapName = readSnapShot(SNAP_PATH_USER_DOMAIN + '/properties/name.txt');

      expect(renderId).toEqual(snapId);
      expect(renderName).toEqual(snapName);
    });
    test('domain aggregate', async () => {
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

    test('infrastructure repository', async () => {
      const renderDomainRepository = readRender(PATH_USER_DOMAIN + '/user.repository.ts');
      const renderRepositoryDao = readRender(PATH_USER_INFRASTRUCTURE + '/persistence/user.dao.ts');
      const renderRepositoryFirestore = readRender(PATH_USER_INFRASTRUCTURE + '/persistence/user-firestore.repository.ts');

      const snapDomainRepository = readSnapShot(SNAP_PATH_USER_DOMAIN + '/repository/repository.txt');
      const snapRepositoryDao = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/repository/firestore-dao.txt');
      const snapRepositoryFirestore = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/repository/firestore.txt');

      expect(renderDomainRepository).toEqual(snapDomainRepository);
      expect(renderRepositoryDao).toEqual(snapRepositoryDao);
      expect(renderRepositoryFirestore).toEqual(snapRepositoryFirestore);
    });
    test('infrastructure graphQl', async () => {
      const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/graph-ql/user.type.ts');
      const renderResolver = readRender(PATH_USER_INFRASTRUCTURE + '/graph-ql/user.resolver.ts');
      const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/graph-ql/type.txt');
      const snapResolver = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/graph-ql/resolver.txt');
      expect(renderAggregate).toEqual(snapAggregate);
      expect(renderResolver).toEqual(snapResolver);
    });
    describe('infrastructure event', () => {
      test('created', async () => {
        const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-created.ts');
        const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-created.txt');
        expect(renderAggregate).toEqual(snapAggregate);
      });
      test('updated', async () => {
        const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-updated.ts');
        const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-updated.txt');
        expect(renderAggregate).toEqual(snapAggregate);
      });
      test('deleted', async () => {
        const renderAggregate = readRender(PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-deleted.ts');
        const snapAggregate = readSnapShot(SNAP_PATH_USER_INFRASTRUCTURE + '/event/resource-on-user-deleted.txt');
        expect(renderAggregate).toEqual(snapAggregate);
      });
    });
  });
});
