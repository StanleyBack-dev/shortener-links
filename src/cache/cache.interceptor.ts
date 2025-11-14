import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CacheGetService } from './services/cache.get.service';
import { CacheSetService } from './services/cache.set.service';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly cacheGetService: CacheGetService,
    private readonly cacheSetService: CacheSetService,
  ) {}

  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = ctx.switchToHttp().getRequest();

    // IGNORA TUDO QUE NAO FOR GET
    if (req.method !== 'GET') return next.handle();

    // CRIA A KEY BASEADO NA URL COMPLETA
    const key = `cache:${req.originalUrl}`;

    // TENTA PEGAR DO CACHE
    const cached = await this.cacheGetService.get(key);

    if (cached) {
      return of(cached);
    }

    // SE NÃO EXISTIR, EXECUTA O HANDLER E DEPOIS SALVA NO CACHE
    return next.handle().pipe(
      tap((data) => {
        this.cacheSetService.set(key, data);
      }),
    );
  }
}