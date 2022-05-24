import { UserRepository } from '../../../../src/context/user/domain/user.repository';
import { UserMother } from './user-object-mother';
import { UserE2eModule } from '../user-e2e-module';

describe('User persistence', () => {
  let repository: UserRepository;
  beforeEach(async () => {
    ({ userRepository: repository } = await UserE2eModule.create());
    const items = await repository.findAll();
    for await (const item of items) {
      await repository.deleteById(item.id);
    }
  });

  it('persist', async () => {
    const user = UserMother.create();
    await repository.persist(user);
    const userDb = await repository.findById(user.id);
    expect(userDb.id).toEqual(user.id);
    expect(userDb.name).toEqual(user.name);
  });
});
