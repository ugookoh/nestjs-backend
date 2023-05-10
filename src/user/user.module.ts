import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserProduct } from './entities';

@Module({
  providers: [UserService, UserResolver],
  imports: [TypeOrmModule.forFeature([User, UserProduct])],
})
export class UserModule {}
