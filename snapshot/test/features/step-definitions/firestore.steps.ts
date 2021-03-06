import { after, before, binding, then } from 'cucumber-tsflow';
import admin, { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;
import { Firebase } from '../../../src/context/share/infrastructure/firebase';
import { InternalServerErrorException } from '@nestjs/common';
import { assert } from 'chai';
import { toJson } from './tools/string-tools';
import Timestamp = firestore.Timestamp;

@binding()
export class FirestoreSteps {
  db: Firestore;

  @before()
  public async beforeAllScenarios() {
    Firebase.initDefaultApp();
    this.db = admin.firestore();
    await this.deleteCollections();
  }

  @after()
  public async afterAllScenarios() {
    await this.deleteCollections();
  }

  @then('I have the following data on collection {string}')
  public async i_have_the_following_data_on_collection(collectionPath: string, data: string) {
    const collections = toJson(data);
    for await (const collection of collections) {
      const docRef = this.db.collection(collectionPath).doc(collection.id);
      await docRef.set(collection);
    }
  }

  @then('I validate the following data exists on collection {string}')
  public async i_validate_the_following_data_exists_on_collection(collectionPath: string, data: string) {
    const dataJson = toJson(data);
    const dataDb = await this.getAllDataByCollection(collectionPath);
    assert.deepEqual(dataDb, dataJson);
  }

  @then('I validate empty data on collection {string}')
  public async i_validate_empty_data_on_collection(collectionPath: string) {
    const dataDb = await this.getAllDataByCollection(collectionPath);
    assert.deepEqual(dataDb, []);
  }

  private async getAllDataByCollection(collection: string) {
    let dataDb = [];
    try {
      const snapshot = await this.db.collection(collection).get();
      if (!snapshot.empty) {
        dataDb = snapshot.docChanges().map((item) => {
          const data = item.doc.data();
          for (const clave in data) {
            if (data[clave] instanceof Timestamp) {
              data[clave] = data[clave].toDate().toISOString();
            }
          }
          return data;
        });
      }
    } catch (e) {
      throw new InternalServerErrorException(`Error en el servidor firestore ${e}`);
    }
    return dataDb;
  }

  private async deleteCollections() {
    const collectionRef = await this.db.listCollections();

    const collections = collectionRef.map((collection) => {
      return collection.id;
    });

    for await (const collection of collections) {
      await this.deleteCollection(collection);
    }
  }

  private async deleteCollection(collectionPath) {
    const collectionRef = this.db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__');

    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(query, resolve).catch(reject);
    });
  }

  private async deleteQueryBatch(query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }

    // Delete documents in a batch
    const batch = this.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      this.deleteQueryBatch(query, resolve);
    });
  }
}
