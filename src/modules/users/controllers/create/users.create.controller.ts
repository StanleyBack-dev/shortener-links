import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import type { Request } from 'express';
import { UsersCreateService } from '../../services/create/users.create.service';
import { DtoCreateUsersInput } from '../../dto/create/users.create.input.dto';
import { DtoCreateUsersResponse } from '../../dto/create/users.create.response';

@ApiTags('Users')
@Controller('users')
export class UsersCreateController {
  constructor(private readonly usersCreateService: UsersCreateService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: DtoCreateUsersResponse,
  })
  async createUser(
    @Body() data: DtoCreateUsersInput,
    @Req() req: Request,
  ): Promise<DtoCreateUsersResponse> {

    return this.usersCreateService.execute(data);
  }
}