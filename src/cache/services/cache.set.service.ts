import { Injectable, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheSetService {
  constructor(
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  async set(key: string, value: any, ttl?: number) {
    return this.cacheManager.set(key, value, ttl);
  }
}