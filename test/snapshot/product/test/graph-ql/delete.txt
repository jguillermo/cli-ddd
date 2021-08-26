import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductE2eModule } from './product-e2e-module';
import { ProductRepository } from '../../../src/product/domain/product.repository';
import { ProductMother } from '../product-object-mother';

describe('GraphQl Product (productDelete)', () => {
  let app: INestApplication;
  let repository: ProductRepository;
  beforeEach(async () => {
    ({ app, productRepository: repository } = await ProductE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });

  it('delete', async () => {
    const product = ProductMother.create();
    await repository.persist(product);
    const query = `
          mutation{
            productDelete(id:"${product.id.value}"){
              status
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            productDelete: {
              status: 'ok',
            },
          },
        });
        const productDb = await repository.findById(product.id);
        expect(productDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });

  it('delete not exist item', async () => {
    const product = ProductMother.create();
    const query = `
          mutation{
            productDelete(id: "${product.id.value}"){
              status
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            productDelete: {
              status: 'ok',
            },
          },
        });
        const productDb = await repository.findById(product.id);
        expect(productDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });
});
