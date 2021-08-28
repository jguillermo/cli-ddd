import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductE2eModule } from './product-e2e-module';
import { ProductRepository } from '../../../src/product/domain/product.repository';
import { ProductMother } from '../product-object-mother';

describe('GraphQl Product (productPersist)', () => {
  let app: INestApplication;
  let repository: ProductRepository;
  beforeEach(async () => {
    ({ app, productRepository: repository } = await ProductE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });
  describe('create', () => {
    it('data ok return status', () => {
      const product = ProductMother.create();
      const query = `
          mutation{
            productPersist(
              id: "${product.id.value}"
              name: "${product.name.value}"
              code: "${product.code.value}"
              description: "${product.description.value}"
              createAt: "${product.createAt.toString}"
              price: ${product.price.value}
              category: "${product.category.value}"
            ){
              ...on Status{
                status
              }
              ...on Product{
                id
                name
                code
                description
                createAt
                price
                category
              }
            }
          }
          `;
      return request(app.getHttpServer())
        .post(`/graphql`)
        .send({ query: query, variables: {} })
        .then(async (response) => {
          expect(response.body).toEqual({
            data: {
              productPersist: {
                status: 'ok',
              },
            },
          });
          const productDb = await repository.findById(product.id);
          expect(productDb).not.toBeNull();
          expect(productDb.id.value).toEqual(product.id.value);
          expect(productDb.name.value).toEqual(product.name.value);
          expect(productDb.code.value).toEqual(product.code.value);
          expect(productDb.description.value).toEqual(product.description.value);
          expect(productDb.createAt.value).toEqual(product.createAt.value);
          expect(productDb.price.value).toEqual(product.price.value);
          expect(productDb.category.value).toEqual(product.category.value);
          expect(response.statusCode).toEqual(200);
        });
    });
  });

  describe('update', () => {
    it('data  ok return entity', async () => {
      const product = ProductMother.create();
      await repository.persist(product);
      const query = `
          mutation{
            productPersist(
              id: "${product.id.value}"
              name: "${product.name.value}"
              code: "${product.code.value}"
              description: "${product.description.value}"
              createAt: "${product.createAt.toString}"
              price: ${product.price.value}
              category: "${product.category.value}"
              showEntity: true
            ){
              ...on Status{
                status
              }
              ...on Product{
                id
                name
                code
                description
                createAt
                price
                category
              }
            }
          }
          `;
      return request(app.getHttpServer())
        .post(`/graphql`)
        .send({ query: query, variables: {} })
        .then(async (response) => {
          expect(response.body).toEqual({
            data: {
              productPersist: {
                id: product.id.value,
                name: product.name.value,
                code: product.code.value,
                description: product.description.value,
                createAt: product.createAt.toString,
                price: product.price.value,
                category: product.category.value,
              },
            },
          });
          const productDb = await repository.findById(product.id);
          expect(productDb).not.toBeNull();
          expect(productDb.id.value).toEqual(product.id.value);
          expect(productDb.name.value).toEqual(product.name.value);
          expect(productDb.code.value).toEqual(product.code.value);
          expect(productDb.description.value).toEqual(product.description.value);
          expect(productDb.createAt.value).toEqual(product.createAt.value);
          expect(productDb.price.value).toEqual(product.price.value);
          expect(productDb.category.value).toEqual(product.category.value);
          expect(response.statusCode).toEqual(200);
        });
    });
  });
});
