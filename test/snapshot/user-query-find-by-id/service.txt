import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserResponse } from '../user.response';
import { UserId } from '../../domain/user-id';

@Injectable()
export class UserFindByIdService {
  constructor(private repository: UserRepository) {}

  public async execute(id: UserId): Promise<UserResponse | null> {
    const user = await this.repository.findById(id);
    if (!user) {
      return null;
    }
    return UserResponse.fromAggregate(user);
  }
}
