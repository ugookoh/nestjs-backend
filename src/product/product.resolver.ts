import { Product } from './entities';
import { ProductService } from './product.service';
import { ProductInput } from './dtos/create-product.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query((type) => [Product], {
    name: 'getAllProducts',
    description:
      'This query gets all the product in the database.\nGet all the users that have ordered each product by querying the user field as well',
  })
  async getAll() {
    return this.productService.getAll();
  }

  @Query((type) => Product, {
    name: 'getProductById',
    description:
      'This query gets a product by the provided id.\nGet all the users that have ordered this item by querying the user field',
  })
  async get(@Args('id') id: string) {
    return this.productService.get(id);
  }

  @Mutation((returns) => Product, {
    name: 'createProduct',
    description: 'This mutation creates a product',
  })
  create(@Args('productInput') productInput: ProductInput): Promise<Product> {
    return this.productService.create(productInput);
  }
}
