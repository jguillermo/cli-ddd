import { INestApplication } from '@nestjs/common';
import { TestingE2eModule } from '../../testing-e2e-module';
import { UserRepository } from '../../../src/user/domain/user.repository';

export interface UserTestingInterface {
  app: INestApplication;
  userRepository: UserRepository;
}

export class UserE2eModule extends TestingE2eModule {
  static async create(): Promise<UserTestingInterface> {
    const module = new UserE2eModule();
    await module.init();
    return {
      app: module.app,
      userRepository: module.moduleFixture.get<UserRepository>(UserRepository),
    };
  }
}
