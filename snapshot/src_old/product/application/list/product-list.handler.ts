import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { ListProductResponse } from '../list-product.response';
import { DateTypeImp } from 'base-ddd/dist/ValueObject/Implement/DateTypeImp';
import { NumberTypeImp } from 'base-ddd/dist/ValueObject/Implement/NumberTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';
import { ProductListDto } from './product-list.dto';
import { ProductListService } from './product-list.service';

@QueryHandler(ProductListDto)
export class ProductListHandler implements IQueryHandler<ProductListDto> {
  constructor(private service: ProductListService) {}

  async execute(dto: ProductListDto): Promise<ListProductResponse> {
    const id = new UUIDTypeImp(dto.id);
    const name = new StringTypeImp(dto.name);
    const code = new UUIDTypeImp(dto.code);
    const description = new StringTypeImp(dto.description);
    const createAt = new DateTypeImp(dto.createAt);
    const price = new NumberTypeImp(dto.price);
    const category = new StringTypeImp(dto.category);
    const paginator = PaginatorTypeImp.create(dto.paginator?.page, dto.paginator?.perPage);
    const order = OrderTypeImp.create(dto.order?.field, dto.order?.direction);

    return await this.service.execute(id, name, code, description, createAt, price, category, paginator, order);
  }
}
