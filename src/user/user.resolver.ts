import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities';
import { UserInput, UserOrderInput } from './dtos';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((type) => [User], {
    name: 'getAllUsers',
    description:
      'This query gets all the users in the database and displays them with the orders they are paired with',
  })
  getAll() {
    return this.userService.getAll();
  }

  @Query((type) => User, {
    name: 'getUserById',
    description:
      'This query gets the user that matches the provided id and displays it with the associated orders of the user',
  })
  get(@Args('id') id: string) {
    return this.userService.get(id);
  }

  @Mutation((returns) => User, {
    name: 'createUser',
    description:
      'This mutation creates a user. However you cannot pass in the orders at this time',
  })
  create(@Args('userInput') userInput: UserInput): Promise<User> {
    return this.userService.create(userInput);
  }

  @Mutation((returns) => User, {
    name: 'addProductToUserOrder',
    description: 'This mutation adds a product to the order of the user.',
  })
  addProductToUserOrder(
    @Args('userOrderInput', {})
    userOrderInput: UserOrderInput,
  ): Promise<User> {
    return this.userService.addProductToUserOrder(userOrderInput);
  }
}
