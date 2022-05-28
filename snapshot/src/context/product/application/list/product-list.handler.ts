import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { ProductListResponse } from '../product-list.response';
import { ProductListDto } from './product-list.dto';
import { ProductListService } from './product-list.service';

@QueryHandler(ProductListDto)
export class ProductListHandler implements IQueryHandler<ProductListDto> {
  constructor(private service: ProductListService) {}

  async execute(dto: ProductListDto): Promise<ProductListResponse> {
    const paginator = PaginatorTypeImp.create(dto.paginator?.page, dto.paginator?.perPage);
    const order = OrderTypeImp.create(dto.order?.field, dto.order?.direction);
    return await this.service.execute(dto, paginator, order);
  }
}
