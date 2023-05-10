import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { Product } from './entities';
import { ProductInput } from './dtos';
import { ProductService } from './product.service';

const mockProduct: Product = {
  name: 'Coco Pops',
  id: 'f28faf3e-ad91-41d5-b4f3-412ae52a5e5d',
  price: 12.99,
  user: [],
};

const postsServiceMock = {
  get: jest.fn((id: string): Product => mockProduct),
  getAll: jest.fn((): Product[] => [mockProduct]),
  create: jest.fn((product: ProductInput): Product => mockProduct),
};

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        { provide: ProductService, useValue: postsServiceMock },
      ],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be a single item in the array', async () => {
    const result = await resolver.getAll();
    expect(result.length).toBe(1);
  });

  it('should return the exact same product', async () => {
    const result = await resolver.get(mockProduct.id);
    expect(result).toEqual(mockProduct);
  });

  it('should return one item', async () => {
    const result = await resolver.create(mockProduct);
    expect(result).toEqual(mockProduct);
  });
});
