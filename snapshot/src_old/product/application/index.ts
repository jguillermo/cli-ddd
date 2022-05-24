import { ProductDeleteHandler } from './delete/product-delete.handler';
import { ProductFindByIdHandler } from './find-by-id/product-find-by-id.handler';
import { ProductListHandler } from './list/product-list.handler';
import { ProductPersistHandler } from './persist/product-persist.handler';
import { ProductDeleteService } from './delete/product-delete.service';
import { ProductFindByIdService } from './find-by-id/product-find-by-id.service';
import { ProductListService } from './list/product-list.service';
import { ProductPersistService } from './persist/product-persist.service';

export const ApplicationHandlers = [
  ProductDeleteHandler,
  ProductFindByIdHandler,
  ProductListHandler,
  ProductPersistHandler,
];
export const ApplicationServices = [
  ProductDeleteService,
  ProductFindByIdService,
  ProductListService,
  ProductPersistService,
];
