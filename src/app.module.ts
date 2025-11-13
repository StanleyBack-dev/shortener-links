import typeOrmConfig from './database/database.orm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinksModule } from './modules/shortener/shortener.module';
import { JwtUserInterceptor } from './common/interceptors/jwt.user.interceptor';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    LinksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: (jwtService: JwtService) => new JwtUserInterceptor(jwtService),
      inject: [JwtService],
    },
    JwtService,
  ],
})

export class AppModule {}