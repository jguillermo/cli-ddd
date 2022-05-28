import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ProductResponse } from '../product.response';
import { ProductId } from '../../domain/aggregate/product-id';
import { ProductFindByIdDto } from './product-find-by-id.dto';
import { ProductFindByIdService } from './product-find-by-id.service';

@QueryHandler(ProductFindByIdDto)
export class ProductFindByIdHandler implements IQueryHandler<ProductFindByIdDto> {
  constructor(private service: ProductFindByIdService) {}

  async execute(dto: ProductFindByIdDto): Promise<ProductResponse> {
    const id = new ProductId(dto.id);

    return await this.service.execute(id);
  }
}
