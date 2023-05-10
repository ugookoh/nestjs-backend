import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';
import { Product } from '../../product/entities';
import { User } from './user.entity';

@Entity('user_product')
@ObjectType()
export class UserProduct {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User[];

  @ManyToOne(() => Product, (product) => product.user)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  order: Product[];
}