import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { UserInput, UserOrderInput } from './dtos';
import { Repository } from 'typeorm';
import { UserProduct } from './entities/user_product.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserProduct)
    private userProductRepository: Repository<UserProduct>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.find({ relations: ['order'] });
    return users;
  }

  async get(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['order'],
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async create(userInput: UserInput): Promise<User> {
    const newUser = this.userRepository.create(userInput);
    return this.userRepository.save(newUser);
  }

  async addProductToUserOrder(userAndProductId: UserOrderInput): Promise<User> {
    await this.userProductRepository.save(userAndProductId);
    return await this.get(userAndProductId.userId);
  }
}
