import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Data to provide in order to create a product' })
export class ProductInput {
  @Field()
  name: string;

  @Field()
  price: number;
}
