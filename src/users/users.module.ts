import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Rols } from './entities/rols.entity';
import { RolsService } from './rols.service';
import { RolsController } from './rols.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rols])],
  controllers: [UsersController, RolsController],
  providers: [UsersService, RolsService],
  exports: [UsersService, RolsService],
})
export class UsersModule {}
