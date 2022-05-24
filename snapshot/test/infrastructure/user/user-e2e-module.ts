import { TestingE2eModule } from '../testing-e2e-module';
import { UserRepository } from '../../../src/context/user/domain/user.repository';

export interface UserTestingInterface {
  userRepository: UserRepository;
}

export class UserE2eModule extends TestingE2eModule {
  static async create(): Promise<UserTestingInterface> {
    const module = new UserE2eModule();
    await module.init();
    return {
      userRepository: module.moduleFixture.get<UserRepository>(UserRepository),
    };
  }
}
