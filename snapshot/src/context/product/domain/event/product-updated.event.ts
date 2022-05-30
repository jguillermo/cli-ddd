import { EventBase } from 'base-ddd';

export class ProductUpdatedEvent extends EventBase {
  constructor(
    private _id: string,
    private _name: string,
    private _code: string,
    private _description: string,
    private _createAt: string,
    private _price: number,
    private _isActive: boolean,
    private _category: string,
  ) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

  get description(): string {
    return this._description;
  }

  get createAt(): string {
    return this._createAt;
  }

  get price(): number {
    return this._price;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get category(): string {
    return this._category;
  }

  eventName(): string {
    return 'product.updated';
  }
}
