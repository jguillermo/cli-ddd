import { cleanRender, DDD, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

// const PATH_PRODUCT = 'src/product';
// const PATH_PRODUCT_DOMAIN = PATH_PRODUCT + '/domain';
// const PATH_PRODUCT_APPLICATION = PATH_PRODUCT + '/application';
// const PATH_PRODUCT_INFRASTRUCTURE = PATH_PRODUCT + '/infrastructure';
//
// const SNAP_PATH_PRODUCT = '/user';
// const SNAP_PATH_PRODUCT_DOMAIN = '/user/domain';
// const SNAP_PATH_PRODUCT_APPLICATION = '/user/application';
// const SNAP_PATH_PRODUCT_INFRASTRUCTURE = '/user/infrastructure';

const PATH_PRODUCT_TEST = 'test/product';
const SNAP_PATH_PRODUCT_TEST = '/product/test';

const MENU = menu(MenuPropertie.PRODUCT, DDD.APP_CRUD);
describe('Product crud', () => {
  beforeAll(async () => {
    cleanRender();
    await run(MENU);
  });
  describe('test e2e', () => {
    test('delete', async () => {
      await run([...MENU]);
      const render = readRender(PATH_PRODUCT_TEST + '/graph-ql/product-delete.e2e-spec.ts');
      const snap = readSnapShot(SNAP_PATH_PRODUCT_TEST + '/graph-ql/delete.txt');
      expect(render).toEqual(snap);
    });

    test('findById', async () => {
      await run([...MENU]);
      const render = readRender(PATH_PRODUCT_TEST + '/graph-ql/product-find-by-id.e2e-spec.ts');
      const snap = readSnapShot(SNAP_PATH_PRODUCT_TEST + '/graph-ql/find-by-id.txt');
      expect(render).toEqual(snap);
    });

    test('list', async () => {
      await run([...MENU]);
      const render = readRender(PATH_PRODUCT_TEST + '/graph-ql/product-list.e2e-spec.ts');
      const snap = readSnapShot(SNAP_PATH_PRODUCT_TEST + '/graph-ql/list.txt');
      expect(render).toEqual(snap);
    });

    test('persist', async () => {
      await run([...MENU]);
      const render = readRender(PATH_PRODUCT_TEST + '/graph-ql/product-persist.e2e-spec.ts');
      const snap = readSnapShot(SNAP_PATH_PRODUCT_TEST + '/graph-ql/persist.txt');
      expect(render).toEqual(snap);
    });

    test('e2e module', async () => {
      await run([...MENU]);
      const render = readRender(PATH_PRODUCT_TEST + '/graph-ql/product-e2e-module.ts');
      const snap = readSnapShot(SNAP_PATH_PRODUCT_TEST + '/graph-ql/e2e-module.txt');
      expect(render).toEqual(snap);
    });

    test('object Mother', async () => {
      await run([...MENU]);
      const render = readRender(PATH_PRODUCT_TEST + '/product-object-mother.ts');
      const snap = readSnapShot(SNAP_PATH_PRODUCT_TEST + '/object-mother.txt');
      expect(render).toEqual(snap);
    });
  });
});
