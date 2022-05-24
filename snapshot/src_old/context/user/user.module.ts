import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './domain/user.repository';
import { ShareModule } from '../share/share.module';
import { UserResolver } from '../../app/graph-ql/user/user.resolver';
import { AppEvents } from './infrastructure/event';
import { ApplicationHandlers, ApplicationServices } from './application';
import { UserFirestoreRepository } from './infrastructure/persistence/firestore/user-firestore.repository';

@Module({
  imports: [CqrsModule, ShareModule],
  providers: [
    {
      provide: UserRepository,
      useClass: UserFirestoreRepository,
    },
    ...ApplicationHandlers,
    ...ApplicationServices,
    ...AppEvents,
    UserResolver,
  ],
})
export class UserModule {}
