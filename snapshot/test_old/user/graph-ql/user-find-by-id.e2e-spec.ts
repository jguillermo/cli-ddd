import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserE2eModule } from './user-e2e-module';
import { UserRepository } from '../../../src/user/domain/user.repository';
import { UserMother } from '../user-object-mother';

describe('GraphQl User (user)', () => {
  let app: INestApplication;
  let repository: UserRepository;
  beforeEach(async () => {
    ({ app, userRepository: repository } = await UserE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });

  it('get', async () => {
    const user = UserMother.create();
    await repository.persist(user);
    const query = `
          query{
            user(id: "${user.id.value}"){
              id
              name
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            user: {
              id: user.id.value,
              name: user.name.value,
            },
          },
        });
        const userDb = await repository.findById(user.id);
        expect(userDb).not.toBeNull();
        expect(userDb.id.value).toEqual(user.id.value);
        expect(userDb.name.value).toEqual(user.name.value);
        expect(response.statusCode).toEqual(200);
      });
  });

  it('get not exit', async () => {
    const user = UserMother.create();
    const query = `
          query{
            user(id: "${user.id.value}"){
              id
              name
            }
          }
          `;
    return request(app.getHttpServer())
      .post(`/graphql`)
      .send({ query: query, variables: {} })
      .then(async (response) => {
        expect(response.body).toEqual({
          data: {
            user: null,
          },
        });
        const userDb = await repository.findById(user.id);
        expect(userDb).toBeNull();
        expect(response.statusCode).toEqual(200);
      });
  });
});
