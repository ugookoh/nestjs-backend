import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { User } from './entities';
import { UserInput, UserOrderInput } from './dtos';
import { UserService } from './user.service';
import { Product } from 'src/product/entities';

const mockUser: User = {
  id: '771b3f80-d6c7-490e-ae18-871c9e0e90ee',
  name: 'Ugo',
  age: 22,
  email: 'edokoh999@gmail.com',
  order: [],
};

const mockProduct: Product = {
  name: 'Coco Pops',
  id: 'f28faf3e-ad91-41d5-b4f3-412ae52a5e5d',
  price: 12.99,
  user: [],
};

const userServiceMock = {
  get: jest.fn((id: string): User => mockUser),
  getAll: jest.fn((): User[] => [mockUser]),
  create: jest.fn((user: UserInput): User => mockUser),
  addProductToUserOrder: jest.fn(
    (userOrderInput: UserOrderInput): User => ({
      ...mockUser,
      order: [mockProduct],
    }),
  ),
};

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be a single item in the array', async () => {
    const result = await resolver.getAll();
    expect(result.length).toBe(1);
  });

  it('should return the exact same user', async () => {
    const result = await resolver.get(mockUser.id);
    expect(result).toEqual(mockUser);
  });

  it('should return one item', async () => {
    const result = await resolver.create(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should add the product to the order of the user', async () => {
    const result = await resolver.addProductToUserOrder({
      userId: mockUser.id,
      productId: mockProduct.id,
    });
    expect(result).toEqual({ ...mockUser, order: [mockProduct] });
  });
});
