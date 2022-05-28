import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductDeleteService } from './product-delete.service';
import { ProductDeleteDto } from './product-delete.dto';
import { ProductId } from '../../domain/aggregate/product-id';

@CommandHandler(ProductDeleteDto)
export class ProductDeleteHandler implements ICommandHandler<ProductDeleteDto> {
  constructor(private service: ProductDeleteService) {}

  async execute(dto: ProductDeleteDto): Promise<void> {
    const id = new ProductId(dto.id);

    await this.service.execute(id);
  }
}
