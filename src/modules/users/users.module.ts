import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersGetService } from './services/get/users.get.service';
import { UsersUpdateService } from './services/update/users.update.service';
import { UsersCreateService } from './services/create/users.create.service';
import { UsersCreateController } from './controllers/create/users.create.controller';
import { UsersValidationService } from './services/validation/users.validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersCreateController],
  providers: [UsersGetService, UsersUpdateService, UsersCreateService, UsersValidationService],
  exports: [UsersGetService, UsersUpdateService, UsersCreateService, UsersValidationService],
})

export class UsersModule {}