import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/product.repository';
import { ProductResponse } from '../product.response';
import { ListProductResponse } from '../list-product.response';
import { FilterOpStr, OrderTypeImp, PaginatorTypeImp } from 'base-ddd';
import { DateTypeImp } from 'base-ddd/dist/ValueObject/Implement/DateTypeImp';
import { NumberTypeImp } from 'base-ddd/dist/ValueObject/Implement/NumberTypeImp';
import { StringTypeImp } from 'base-ddd/dist/ValueObject/Implement/StringTypeImp';
import { UUIDTypeImp } from 'base-ddd/dist/ValueObject/Implement/UUIDTypeImp';

@Injectable()
export class ProductListService {
  constructor(private repository: ProductRepository) {}

  public async execute(
    id: UUIDTypeImp,
    name: StringTypeImp,
    code: UUIDTypeImp,
    description: StringTypeImp,
    createAt: DateTypeImp,
    price: NumberTypeImp,
    category: StringTypeImp,
    paginator: PaginatorTypeImp,
    order: OrderTypeImp,
  ): Promise<ListProductResponse> {
    const listProduct = await this.repository.findAll(
      [
        {
          field: 'id',
          opStr: FilterOpStr.EQUAL_TO,
          value: id.value,
        },
        {
          field: 'name',
          opStr: FilterOpStr.EQUAL_TO,
          value: name.value,
        },
        {
          field: 'code',
          opStr: FilterOpStr.EQUAL_TO,
          value: code.value,
        },
        {
          field: 'description',
          opStr: FilterOpStr.EQUAL_TO,
          value: description.value,
        },
        {
          field: 'createAt',
          opStr: FilterOpStr.EQUAL_TO,
          value: createAt.toString,
        },
        {
          field: 'price',
          opStr: FilterOpStr.EQUAL_TO,
          value: price.toString,
        },
        {
          field: 'category',
          opStr: FilterOpStr.EQUAL_TO,
          value: category.value,
        },
      ],
      paginator,
      order,
    );
    return new ListProductResponse(
      listProduct.map((product) => {
        return ProductResponse.fromAggregate(product);
      }),
    );
  }
}
