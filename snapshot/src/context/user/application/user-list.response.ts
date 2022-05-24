import { UserResponse } from './user.response';

export class UserListResponse {
  public list: UserResponse[];

  constructor(list: UserResponse[]) {
    this.list = list;
  }
}
