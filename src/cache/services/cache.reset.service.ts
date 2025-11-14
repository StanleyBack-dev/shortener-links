import { Injectable, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheResetService {
  constructor(
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  async resetByPrefix(prefix: string) {
    const keys = await (this.cacheManager as any).store.keys(`${prefix}*`);

    for (const key of keys) {
      await this.cacheManager.del(key);
    }
  }
}