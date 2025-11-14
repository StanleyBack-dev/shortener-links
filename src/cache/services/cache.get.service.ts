import { Injectable, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheGetService {
  constructor(
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    const value = await this.cacheManager.get<T>(key);
    return value ?? null;
  }
}