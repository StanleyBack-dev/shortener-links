import typeOrmConfig from './database/database.orm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinksModule } from './modules/shortener/shortener.module';
import { JwtUserInterceptor } from './common/interceptors/jwt.user.interceptor';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './common/guards/jwt.auth.guard';
import { CommonModule } from './common/common.module';
import { AppCacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    UsersModule,
    AuthModule,
    LinksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AppCacheModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: (jwtService: JwtService) => new JwtUserInterceptor(jwtService),
      inject: [JwtService],
    },
  ],
})

export class AppModule {}