import typeOrmConfig from './database/database.orm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UsersModule,
     AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})

export class AppModule {}