import { UserDeleteHandler } from './delete/user-delete.handler';
import { UserFindByIdHandler } from './find-by-id/user-find-by-id.handler';
import { UserListHandler } from './list/user-list.handler';
import { UserPersistHandler } from './persist/user-persist.handler';
import { UserDeleteService } from './delete/user-delete.service';
import { UserFindByIdService } from './find-by-id/user-find-by-id.service';
import { UserListService } from './list/user-list.service';
import { UserPersistService } from './persist/user-persist.service';

export const ApplicationHandlers = [UserDeleteHandler, UserFindByIdHandler, UserListHandler, UserPersistHandler];
export const ApplicationServices = [UserDeleteService, UserFindByIdService, UserListService, UserPersistService];
