import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import { UserRepository } from '../../src/context/user/domain/user.repository';
import { FirestoreService } from '../../src/context/share/infrastructure/firestore/firestore.service';

export interface TestingInterface {
  userRepository: UserRepository;
  firestoreService: FirestoreService;
}

export class TestingE2eModule {
  private _app: INestApplication;
  private _moduleFixture: TestingModule;

  protected async init(): Promise<void> {
    this._moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    this._app = this._moduleFixture.createNestApplication();
    this._app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    await this._app.init();
  }

  get app(): INestApplication {
    return this._app;
  }

  get moduleFixture(): TestingModule {
    return this._moduleFixture;
  }

  static async create(): Promise<TestingInterface> {
    const module = new TestingE2eModule();
    await module.init();
    return {
      userRepository: module.moduleFixture.get<UserRepository>(UserRepository),
      firestoreService: module.moduleFixture.get<FirestoreService>(FirestoreService),
    };
  }
}
