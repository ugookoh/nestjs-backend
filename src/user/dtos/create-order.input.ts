import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description:
    "Data to provide in order to insert a product inside a user's order",
})
export class UserOrderInput {
  @Field()
  userId: string;

  @Field()
  productId: string;
}
