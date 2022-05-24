import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductPersistService } from './product-persist.service';
import { ProductPersistDto } from './product-persist.dto';
import { ProductId } from '../../domain/product-id';
import { ProductName } from '../../domain/product-name';
import { ProductCode } from '../../domain/product-code';
import { ProductDescription } from '../../domain/product-description';
import { ProductCreateAt } from '../../domain/product-create-at';
import { ProductPrice } from '../../domain/product-price';
import { ProductCategory } from '../../domain/product-category';

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
    const category = new ProductCategory(dto.category);

    await this.service.execute(id, name, code, description, createAt, price, category);
  }
}
