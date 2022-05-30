import { ProductRepository } from '../../../../src/context/product/domain/product.repository';
import { ProductMother } from './product-object-mother';
import { ProductE2eModule } from '../product-e2e-module';

describe('Product persistence', () => {
  let repository: ProductRepository;
  beforeEach(async () => {
    ({ productRepository: repository } = await ProductE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });

  it('persist', async () => {
    const product = ProductMother.create();
    await repository.persist(product);
    const productDb = await repository.findById(product.id);
    expect(productDb.id).toEqual(product.id);
    expect(productDb.name).toEqual(product.name);
    expect(productDb.code).toEqual(product.code);
    expect(productDb.description).toEqual(product.description);
    expect(productDb.createAt).toEqual(product.createAt);
    expect(productDb.price).toEqual(product.price);
    expect(productDb.isActive).toEqual(product.isActive);
    expect(productDb.category).toEqual(product.category);
  });
});
