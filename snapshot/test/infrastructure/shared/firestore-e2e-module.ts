import { TestingE2eModule } from '../testing-e2e-module';
import { FirestoreService } from '../../../src/context/share/infrastructure/firestore/firestore.service';

export interface FirestoreTestingInterface {
  firestoreService: FirestoreService;
}

export class FirestoreE2eModule extends TestingE2eModule {
  static async create(): Promise<FirestoreTestingInterface> {
    const module = new FirestoreE2eModule();
    await module.init();
    return {
      firestoreService: module.moduleFixture.get<FirestoreService>(FirestoreService),
    };
  }
}
