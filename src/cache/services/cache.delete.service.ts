import { Injectable, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheDeleteService {
  constructor(
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  async del(key: string) {
    return this.cacheManager.del(key);
  }
}