import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserRepository } from '../../../src/user/domain/user.repository';
import { UserMother } from '../user-object-mother';
import { TestingE2eModule } from '../../testing-e2e-module';

describe('GraphQl User (userDelete)', () => {
  let app: INestApplication;
  let repository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository: repository } = await TestingE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });

  it('delete', async () => {
    const user = UserMother.create();
    await repository.persist(user);
    const query = `
          mutation{
            userDelete(id:"${user.id.value}"){
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
            userDelete: {
              status: 'ok',
            },
          },
        });
        const userDb = await repository.findById(user.id);
        expect(userDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });

  it('delete not exist item', async () => {
    const user = UserMother.create();
    const query = `
          mutation{
            userDelete(id: "${user.id.value}"){
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
            userDelete: {
              status: 'ok',
            },
          },
        });
        const userDb = await repository.findById(user.id);
        expect(userDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });
});
