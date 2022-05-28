import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultProductPersist, ProductType } from './product.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseStatus } from '../../../context/share/application/applicationResponse';
import { StatusType } from '../../../context/share/app/status.type';
import { ProductFindByIdDto } from '../../../context/product/application/find-by-id/product-find-by-id.dto';
import { ProductPersistDto } from '../../../context/product/application/persist/product-persist.dto';
import { ProductDeleteDto } from '../../../context/product/application/delete/product-delete.dto';
import { ProductListDto } from '../../../context/product/application/list/product-list.dto';
import { ProductResponse } from '../../../context/product/application/product.response';
import { ProductListResponse } from '../../../context/product/application/product-list.response';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [ProductType], { name: 'productList' })
  async list(@Args() args: ProductListDto): Promise<ProductResponse[]> {
    const data: ProductListResponse = await this.queryBus.execute(args);
    return data.list;
  }

  @Query(() => ProductType, { name: 'product', nullable: true })
  async aggregate(@Args() args: ProductFindByIdDto): Promise<ProductResponse | null> {
    return await this.queryBus.execute(args);
  }

  @Mutation(() => ResultProductPersist, { name: 'productPersist' })
  async persist(@Args() args: ProductPersistDto) {
    await this.commandBus.execute(args);
    return args.showEntity ? await this.queryBus.execute(new ProductFindByIdDto(args.id)) : ResponseStatus.ok();
  }

  @Mutation(() => StatusType, { name: 'productDelete' })
  async delete(@Args() args: ProductDeleteDto): Promise<ResponseStatus> {
    await this.commandBus.execute(args);
    return ResponseStatus.ok();
  }
}
