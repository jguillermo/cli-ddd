import { cleanRender, DDD, menu, MenuPropertie, readRender, readSnapShot, run } from '../load-cmd';

const RENDER_PATH = 'src/product';
const RENDER_PATH_DOMAIN = RENDER_PATH + '/domain';
// const RENDER_PATH_APPLICATION = RENDER_PATH + '/application';
// const RENDER_PATH_INFRASTRUCTURE = RENDER_PATH + '/infrastructure';
//
const SNAP_PATH = '/product';
const SNAP_PATH_DOMAIN = SNAP_PATH + '/domain';
// const SNAP_PATH_APPLICATION = '/user/application';
// const SNAP_PATH_INFRASTRUCTURE = '/user/infrastructure';

const PATH_PRODUCT_TEST = 'test/product';
const SNAP_PATH_PRODUCT_TEST = '/product/test';

const MENU = menu(MenuPropertie.PRODUCT, DDD.APP_CRUD);
describe('Product crud', () => {
  beforeAll(async () => {
    cleanRender();
    await run(MENU);
  });
  describe('domain', () => {
    test('properties', async () => {
      console.log(RENDER_PATH_DOMAIN + '/product-category.ts');
      const renderCategory = readRender(RENDER_PATH_DOMAIN + '/product-category.ts');
      // const renderCode = readRender(RENDER_PATH_DOMAIN + '/product-code.ts');
      // const renderCreateAt = readRender(RENDER_PATH_DOMAIN + '/product-create-at.ts');
      // const renderDescription = readRender(RENDER_PATH_DOMAIN + '/product-description.ts');
      // const renderId = readRender(RENDER_PATH_DOMAIN + '/product-id.ts');
      // const renderName = readRender(RENDER_PATH_DOMAIN + '/product-name.ts');
      // const renderPrice = readRender(RENDER_PATH_DOMAIN + '/product-price.ts');

      const snapRenderCategory = readSnapShot(SNAP_PATH_DOMAIN + '/product-category.txt');
      // const snapRenderCode = readSnapShot(SNAP_PATH_DOMAIN + '/product-code.txt');
      // const snapRenderCreateAt = readSnapShot(SNAP_PATH_DOMAIN + '/product-create-at.txt');
      // const snapRenderDescription = readSnapShot(SNAP_PATH_DOMAIN + '/product-description.txt');
      // const snapRenderId = readSnapShot(SNAP_PATH_DOMAIN + '/product-id.txt');
      // const snapRenderName = readSnapShot(SNAP_PATH_DOMAIN + '/product-name.txt');
      // const snapRenderPrice = readSnapShot(SNAP_PATH_DOMAIN + '/product-price.txt');

      expect(renderCategory).toEqual(snapRenderCategory);
      // expect(renderCode).toEqual(snapRenderCode);
      // expect(renderCreateAt).toEqual(snapRenderCreateAt);
      // expect(renderDescription).toEqual(snapRenderDescription);
      // expect(renderId).toEqual(snapRenderId);
      // expect(renderName).toEqual(snapRenderName);
      // expect(renderPrice).toEqual(snapRenderPrice);
    });
    test.only('aggregate', async () => {
      const renderAggregate = readRender(RENDER_PATH_DOMAIN + '/product.ts');
      // const renderEventCreated = readRender(RENDER_PATH_DOMAIN + '/product-created.event.ts');
      // const renderEventUpdated = readRender(RENDER_PATH_DOMAIN + '/product-updated.event.ts');
      // const renderEventDeleted = readRender(RENDER_PATH_DOMAIN + '/product-deleted.event.ts');

      const snapAggregate = readSnapShot(SNAP_PATH_DOMAIN + '/product.txt');
      // const snapEventCreated = readSnapShot(SNAP_PATH_DOMAIN + '/product-created.event.txt');
      // const snapEventUpdated = readSnapShot(SNAP_PATH_DOMAIN + '/product-updated.event.txt');
      // const snapEventDeleted = readSnapShot(SNAP_PATH_DOMAIN + '/product-deleted.event.txt');

      expect(renderAggregate).toEqual(snapAggregate);
      // expect(renderEventCreated).toEqual(snapEventCreated);
      // expect(renderEventUpdated).toEqual(snapEventUpdated);
      // expect(renderEventDeleted).toEqual(snapEventDeleted);
    });
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
