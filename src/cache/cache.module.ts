import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from './cache.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheGetService } from './services/cache.get.service';
import { CacheSetService } from './services/cache.set.service';
import { CacheDeleteService } from './services/cache.delete.service';
import { CacheResetService } from './services/cache.reset.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          },
          ttl: 1000 * 60 * 10,
        }),
      }),
    }),
  ],
  providers: [
    CacheGetService,
    CacheSetService,
    CacheDeleteService,
    CacheResetService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [
    CacheGetService,
    CacheSetService,
    CacheDeleteService,
    CacheResetService,
  ],
})

export class AppCacheModule {}