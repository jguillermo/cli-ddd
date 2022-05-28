import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { ProductResponse } from '../product.response';
import { ProductListResponse } from '../product-list.response';
import { DateTypeImp, FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { ProductListDto } from './product-list.dto';

@Injectable()
export class ProductListService {
  constructor(private repository: ProductRepository) {}

  public async execute(
    dto: ProductListDto,
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ProductListResponse> {
    const listProduct = await this.repository.findAll(
      [
        {
          field: 'id',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.id,
        },
        {
          field: 'name',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.name,
        },
        {
          field: 'code',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.code,
        },
        {
          field: 'description',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.description,
        },
        {
          field: 'createAt',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.createAt ? DateTypeImp.create(dto.createAt).toString : null,
        },
        {
          field: 'price',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.price,
        },
        {
          field: 'category',
          opStr: FilterOpStr.EQUAL_TO,
          value: dto.category,
        },
      ],
      paginator,
      order,
    );
    return new ProductListResponse(
      listProduct.map((product) => {
        return ProductResponse.fromAggregate(product);
      }),
    );
  }
}
