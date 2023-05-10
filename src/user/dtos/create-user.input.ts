import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Data to provide in order to create a user' })
export class UserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;
}
