import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

export abstract class TestingE2eModule {
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
}
