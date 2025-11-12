import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersGetService } from './services/users.get.service';
import { UsersUpdateService } from './services/users.update.service';
import { UsersCreateService } from './services/users.create.service';
import { UsersCreateController } from './controllers/users.create.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersCreateController],
  providers: [UsersGetService, UsersUpdateService, UsersCreateService],
  exports: [UsersGetService, UsersUpdateService, UsersCreateService],
})

export class UsersModule {}