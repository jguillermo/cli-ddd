import { cleanRender, DDD, menu, MenuPropertie, run, testCrud } from '../load-cmd';

const aggregate = 'user';

const MENU = menu(MenuPropertie.USER, DDD.APP_CRUD);
describe(`${aggregate} CRUD`, () => {
  beforeAll(async () => {
    cleanRender();
    await run(MENU);
  });
  describe('application', () => {
    test('delete', async () => {
      testCrud(`src/context/${aggregate}/application/delete/${aggregate}-delete.dto.ts`);
      testCrud(`src/context/${aggregate}/application/delete/${aggregate}-delete.handler.ts`);
      testCrud(`src/context/${aggregate}/application/delete/${aggregate}-delete.service.ts`);
    });
    test('findById', async () => {
      testCrud(`src/context/${aggregate}/application/find-by-id/${aggregate}-find-by-id.dto.ts`);
      testCrud(`src/context/${aggregate}/application/find-by-id/${aggregate}-find-by-id.handler.ts`);
      testCrud(`src/context/${aggregate}/application/find-by-id/${aggregate}-find-by-id.service.ts`);
    });
    test('list', async () => {
      testCrud(`src/context/${aggregate}/application/list/${aggregate}-list.dto.ts`);
      testCrud(`src/context/${aggregate}/application/list/${aggregate}-list.handler.ts`);
      testCrud(`src/context/${aggregate}/application/list/${aggregate}-list.service.ts`);
    });
    test('persist', async () => {
      testCrud(`src/context/${aggregate}/application/persist/${aggregate}-persist.dto.spec.ts`);
      testCrud(`src/context/${aggregate}/application/persist/${aggregate}-persist.dto.ts`);
      testCrud(`src/context/${aggregate}/application/persist/${aggregate}-persist.handler.ts`);
      testCrud(`src/context/${aggregate}/application/persist/${aggregate}-persist.service.ts`);
    });
    test('index', async () => {
      testCrud(`src/context/${aggregate}/application/index.ts`);
    });
    test('response', async () => {
      testCrud(`src/context/${aggregate}/application/${aggregate}-list.response.ts`);
      testCrud(`src/context/${aggregate}/application/${aggregate}.response.ts`);
    });
  });

  describe('domain', () => {
    test('repository', async () => {
      testCrud(`src/context/${aggregate}/domain/${aggregate}.repository.ts`);
    });
    test('aggregate', async () => {
      testCrud(`src/context/${aggregate}/domain/aggregate/${aggregate}.ts`);
    });
    test('event', async () => {
      testCrud(`src/context/${aggregate}/domain/event/${aggregate}-created.event.ts`);
      testCrud(`src/context/${aggregate}/domain/event/${aggregate}-deleted.event.ts`);
      testCrud(`src/context/${aggregate}/domain/event/${aggregate}-updated.event.ts`);
    });
    test('properties', async () => {
      testCrud(`src/context/${aggregate}/domain/aggregate/${aggregate}-id.ts`);
      testCrud(`src/context/${aggregate}/domain/aggregate/${aggregate}-name.ts`);
    });
  });

  describe('infrastructure', () => {
    test('event', async () => {
      testCrud(`src/context/${aggregate}/infrastructure/event/resource-on-${aggregate}-created.ts`);
      testCrud(`src/context/${aggregate}/infrastructure/event/resource-on-${aggregate}-deleted.ts`);
      testCrud(`src/context/${aggregate}/infrastructure/event/resource-on-${aggregate}-updated.ts`);
      testCrud(`src/context/${aggregate}/infrastructure/event/index.ts`);
    });
    test('persistence', async () => {
      testCrud(`src/context/${aggregate}/infrastructure/persistence/firestore/${aggregate}.dao.ts`);
      testCrud(`src/context/${aggregate}/infrastructure/persistence/firestore/${aggregate}-firestore.repository.ts`);
    });
  });

  describe('app', () => {
    test('graphQl', async () => {
      testCrud(`src/app/graph-ql/${aggregate}/${aggregate}.resolver.ts`);
      testCrud(`src/app/graph-ql/${aggregate}/${aggregate}.type.ts`);
    });
  });

  test('module', async () => {
    testCrud(`src/context/${aggregate}/${aggregate}.module.ts`);
  });
  describe('test', () => {
    describe('graph-ql features', () => {
      test('delete', async () => {
        testCrud(`test/features/${aggregate}/delete.feature`);
      });
      test('find-by-id', async () => {
        testCrud(`test/features/${aggregate}/find-by-id.feature`);
      });
      test('list', async () => {
        testCrud(`test/features/${aggregate}/list.feature`);
      });
      test('persist', async () => {
        testCrud(`test/features/${aggregate}/persist.feature`);
      });
    });

    test.skip('infrastructure', async () => {
      testCrud(`test/infrastructure/${aggregate}/persistence/${aggregate}-object-mother.ts`);
      testCrud(`test/infrastructure/${aggregate}/persistence/${aggregate}-repository.e2e-spec.ts`);
      //testCrud(`test/infrastructure/testing-e2e-module.ts`);
    });
  });
});
