import { 
  Controller, 
  Post, 
  Body, 
  Req, 
  Res 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthLoginService } from '../services/auth.login.service';
import { DtoAuthLoginInput } from '../dto/auth.login.input.dto';
import { DtoAuthLoginResponse } from '../dto/auth.login.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  // ROTA DE LOGIN
  @Post()
  @ApiOperation({ summary: 'Realiza login e gera tokens JWT' })
  @ApiResponse({ status: 200, type: DtoAuthLoginResponse })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(
    @Body() loginInput: DtoAuthLoginInput,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response, // PERMITE DEFINIR COOKIES
  ): Promise<DtoAuthLoginResponse> {
    // PEGA DADOS DO CLIENTE
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    const deviceName = req.headers['x-device-name']?.toString() || 'unknown';

    // CHAMA O SERVICE DE LOGIN
    return this.authLoginService.login(
      loginInput,
      ipAddress.toString(),
      userAgent.toString(),
      deviceName,
      res,
    );
  }
}