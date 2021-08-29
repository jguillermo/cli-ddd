import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultUserPersist, UserType } from './user.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseStatus } from '../../../share/application/applicationResponse';
import { StatusType } from '../../../share/app/status.type';
import { UserFindByIdDto } from '../../application/find-by-id/user-find-by-id.dto';
import { UserPersistDto } from '../../application/persist/user-persist.dto';
import { UserDeleteDto } from '../../application/delete/user-delete.dto';
import { UserListDto } from '../../application/list/user-list.dto';
import { UserResponse } from '../../application/user.response';
import { ListUserResponse } from '../../application/list-user.response';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [UserType], { name: 'userList' })
  async list(@Args() args: UserListDto): Promise<UserResponse[]> {
    const data: ListUserResponse = await this.queryBus.execute(args);
    return data.list;
  }

  @Query(() => UserType, { name: 'user', nullable: true })
  async aggregate(@Args() args: UserFindByIdDto): Promise<UserResponse | null> {
    return await this.queryBus.execute(args);
  }

  @Mutation(() => ResultUserPersist, { name: 'userPersist' })
  async persist(@Args() args: UserPersistDto) {
    await this.commandBus.execute(args);
    return args.showEntity ? await this.queryBus.execute(new UserFindByIdDto(args.id)) : ResponseStatus.ok();
  }

  @Mutation(() => StatusType, { name: 'userDelete' })
  async delete(@Args() args: UserDeleteDto): Promise<ResponseStatus> {
    await this.commandBus.execute(args);
    return ResponseStatus.ok();
  }
}
