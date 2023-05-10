import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities';
import { Repository } from 'typeorm';
import { ProductInput } from './dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    const products = await this.productRepository.find({ relations: ['user'] });
    return products;
  }

  async get(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return product;
  }

  async create(productInput: ProductInput): Promise<Product> {
    const newProduct = this.productRepository.create(productInput);
    return this.productRepository.save(newProduct);
  }
}
