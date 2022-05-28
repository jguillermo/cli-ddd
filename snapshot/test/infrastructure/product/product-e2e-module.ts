import { TestingE2eModule } from '../testing-e2e-module';
import { ProductRepository } from '../../../src/context/product/domain/product.repository';

export interface ProductTestingInterface {
  productRepository: ProductRepository;
}

export class ProductE2eModule extends TestingE2eModule {
  static async create(): Promise<ProductTestingInterface> {
    const module = new ProductE2eModule();
    await module.init();
    return {
      productRepository: module.moduleFixture.get<ProductRepository>(ProductRepository),
    };
  }
}
