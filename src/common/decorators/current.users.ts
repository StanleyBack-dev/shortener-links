import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/modules/users/entities/users.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Users | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user || null;
  },
);