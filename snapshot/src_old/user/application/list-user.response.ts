import { UserResponse } from './user.response';

export class ListUserResponse {
  public list: UserResponse[];

  constructor(list: UserResponse[]) {
    this.list = list;
  }
}
