import { INestApplication } from '@nestjs/common';
import { TestingE2eModule } from '../../testing-e2e-module';
import { ProductRepository } from '../../../src/product/domain/product.repository';

export interface ProductTestingInterface {
  app: INestApplication;
  productRepository: ProductRepository;
}

export class ProductE2eModule extends TestingE2eModule {
  static async create(): Promise<ProductTestingInterface> {
    const module = new ProductE2eModule();
    await module.init();
    return {
      app: module.app,
      productRepository: module.moduleFixture.get<ProductRepository>(ProductRepository),
    };
  }
}
