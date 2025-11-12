import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { Auth } from './entities/auth.entity';
import { AuthLoginService } from './services/auth.login.service';
import { AuthCreateSessionService } from './services/auth.create.session.service';
import { AuthLoginController } from './controllers/auth.login.controller';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({}),
  ],
  controllers: [AuthLoginController],
  providers: [
    AuthLoginService,
    AuthCreateSessionService,
  ],
  exports: [
    AuthLoginService,
  ],
})

export class AuthModule {}