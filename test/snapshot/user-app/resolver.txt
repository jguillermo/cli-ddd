import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultUserPersist, UserType } from './user.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserFindByIdDto } from '../../modules/user/application/find-by-id/user-find-by-id.dto';
import { ListUserResponse } from '../../modules/user/application/list-user.response';
import { UserResponse } from '../../modules/user/application/user.response';
import { UserListDto } from '../../modules/user/application/list/user-list.dto';
import { UserPersistDto } from '../../modules/user/application/persist/user-persist.dto';
import { UserDeleteDto } from '../../modules/user/application/delete/user-delete.dto';
import { ResponseStatus } from '../../modules/share/application/applicationResponse';
import { StatusType } from '../../modules/share/app/status.type';

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
