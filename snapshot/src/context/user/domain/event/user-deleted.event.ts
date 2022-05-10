import { EventBase } from 'base-ddd';

export class UserDeletedEvent extends EventBase {
  constructor(private _id: string, private _name: string) {
    super();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  eventName(): string {
    return 'user.deleted';
  }
}
