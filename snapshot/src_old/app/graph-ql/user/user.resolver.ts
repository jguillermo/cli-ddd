import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResultUserPersist, UserType } from './user.type';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseStatus } from '../../../context/share/application/applicationResponse';
import { StatusType } from '../../../context/share/app/status.type';
import { UserFindByIdDto } from '../../../context/user/application/find-by-id/user-find-by-id.dto';
import { UserPersistDto } from '../../../context/user/application/persist/user-persist.dto';
import { UserDeleteDto } from '../../../context/user/application/delete/user-delete.dto';
import { UserListDto } from '../../../context/user/application/list/user-list.dto';
import { UserResponse } from '../../../context/user/application/user.response';
import { UserListResponse } from '../../../context/user/application/user-list.response';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [UserType], { name: 'userList' })
  async list(@Args() args: UserListDto): Promise<UserResponse[]> {
    const data: UserListResponse = await this.queryBus.execute(args);
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
