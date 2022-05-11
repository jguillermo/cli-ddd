import { cleanRender, DDD, menu, MenuPropertie, run, testCrud } from '../load-cmd';

const aggregate = 'product';

const MENU = menu(MenuPropertie.PRODUCT, DDD.APP_CRUD);
describe.skip(`${aggregate} CRUD`, () => {
  beforeAll(async () => {
    cleanRender();
    await run(MENU);
  });
  describe('application', () => {
    test('delete', async () => {
      testCrud(`src/${aggregate}/application/delete/${aggregate}-delete.dto.ts`);
      testCrud(`src/${aggregate}/application/delete/${aggregate}-delete.handler.ts`);
      testCrud(`src/${aggregate}/application/delete/${aggregate}-delete.service.ts`);
    });
    test('findById', async () => {
      testCrud(`src/${aggregate}/application/find-by-id/${aggregate}-find-by-id.dto.ts`);
      testCrud(`src/${aggregate}/application/find-by-id/${aggregate}-find-by-id.handler.ts`);
      testCrud(`src/${aggregate}/application/find-by-id/${aggregate}-find-by-id.service.ts`);
    });
    test('list', async () => {
      testCrud(`src/${aggregate}/application/list/${aggregate}-list.dto.ts`);
      testCrud(`src/${aggregate}/application/list/${aggregate}-list.handler.ts`);
      testCrud(`src/${aggregate}/application/list/${aggregate}-list.service.ts`);
    });
    test('persist', async () => {
      testCrud(`src/${aggregate}/application/persist/${aggregate}-persist.dto.spec.ts`);
      testCrud(`src/${aggregate}/application/persist/${aggregate}-persist.dto.ts`);
      testCrud(`src/${aggregate}/application/persist/${aggregate}-persist.handler.ts`);
      testCrud(`src/${aggregate}/application/persist/${aggregate}-persist.service.ts`);
    });
    test('index', async () => {
      testCrud(`src/${aggregate}/application/index.ts`);
    });
    test('response', async () => {
      testCrud(`src/${aggregate}/application/list-${aggregate}.response.ts`);
      testCrud(`src/${aggregate}/application/${aggregate}.response.ts`);
    });
  });

  describe('domain', () => {
    test('repository', async () => {
      testCrud(`src/${aggregate}/domain/${aggregate}.repository.ts`);
    });
    test('aggregate', async () => {
      testCrud(`src/${aggregate}/domain/${aggregate}.ts`);
    });
    test('event', async () => {
      testCrud(`src/${aggregate}/domain/${aggregate}-created.event.ts`);
      testCrud(`src/${aggregate}/domain/${aggregate}-deleted.event.ts`);
      testCrud(`src/${aggregate}/domain/${aggregate}-updated.event.ts`);
    });
    test('properties', async () => {
      testCrud(`src/${aggregate}/domain/${aggregate}-category.ts`);
      testCrud(`src/${aggregate}/domain/${aggregate}-code.ts`);
      testCrud(`src/${aggregate}/domain/${aggregate}-create-at.ts`);
      testCrud(`src/${aggregate}/domain/${aggregate}-description.ts`);
      testCrud(`src/${aggregate}/domain/${aggregate}-id.ts`);
      testCrud(`src/${aggregate}/domain/${aggregate}-name.ts`);
      testCrud(`src/${aggregate}/domain/${aggregate}-price.ts`);
    });
  });

  describe('infrastructure', () => {
    test('event', async () => {
      testCrud(`src/${aggregate}/infrastructure/event/index.ts`);
      testCrud(`src/${aggregate}/infrastructure/event/resource-on-${aggregate}-created.ts`);
      testCrud(`src/${aggregate}/infrastructure/event/resource-on-${aggregate}-deleted.ts`);
      testCrud(`src/${aggregate}/infrastructure/event/resource-on-${aggregate}-updated.ts`);
    });
    test('graphQl', async () => {
      testCrud(`src/${aggregate}/infrastructure/graph-ql/${aggregate}.resolver.ts`);
      testCrud(`src/${aggregate}/infrastructure/graph-ql/${aggregate}.type.ts`);
    });
    test('persistence', async () => {
      testCrud(`src/${aggregate}/infrastructure/persistence/${aggregate}.dao.ts`);
      testCrud(`src/${aggregate}/infrastructure/persistence/${aggregate}-firestore.repository.ts`);
    });
  });

  test('module', async () => {
    testCrud(`src/${aggregate}/${aggregate}.module.ts`);
  });
  describe('test', () => {
    test('graph-ql', async () => {
      testCrud(`test/${aggregate}/graph-ql/${aggregate}-delete.e2e-spec.ts`);
      testCrud(`test/${aggregate}/graph-ql/${aggregate}-find-by-id.e2e-spec.ts`);
      testCrud(`test/${aggregate}/graph-ql/${aggregate}-list.e2e-spec.ts`);
      testCrud(`test/${aggregate}/graph-ql/${aggregate}-persist.e2e-spec.ts`);
      testCrud(`test/${aggregate}/graph-ql/${aggregate}-e2e-module.ts`);
    });
    test('object-mother', async () => {
      testCrud(`test/${aggregate}/${aggregate}-object-mother.ts`);
    });
  });
});
