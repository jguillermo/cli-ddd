import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductPersistService } from './product-persist.service';
import { ProductPersistDto } from './product-persist.dto';
import { ProductId } from '../../domain/aggregate/product-id';
import { ProductName } from '../../domain/aggregate/product-name';
import { ProductCode } from '../../domain/aggregate/product-code';
import { ProductDescription } from '../../domain/aggregate/product-description';
import { ProductCreateAt } from '../../domain/aggregate/product-create-at';
import { ProductPrice } from '../../domain/aggregate/product-price';
import { ProductIsActive } from '../../domain/aggregate/product-is-active';
import { ProductCategory } from '../../domain/aggregate/product-category';

@CommandHandler(ProductPersistDto)
export class ProductPersistHandler implements ICommandHandler<ProductPersistDto> {
  constructor(private service: ProductPersistService) {}

  async execute(dto: ProductPersistDto): Promise<void> {
    const id = new ProductId(dto.id);
    const name = new ProductName(dto.name);
    const code = new ProductCode(dto.code);
    const description = new ProductDescription(dto.description);
    const createAt = new ProductCreateAt(dto.createAt);
    const price = new ProductPrice(dto.price);
    const isActive = new ProductIsActive(dto.isActive);
    const category = new ProductCategory(dto.category);

    await this.service.execute(id, name, code, description, createAt, price, isActive, category);
  }
}
