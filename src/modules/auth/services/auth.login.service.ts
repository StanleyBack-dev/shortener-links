import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ComparePassword } from 'src/utils/hash.util';
import { SetAuthCookies } from 'src/utils/cookies.util';
import { DtoAuthLoginInput } from '../dto/auth.login.input.dto';
import { DtoAuthLoginResponse } from '../dto/auth.login.response.dto';
import { UsersGetService } from 'src/modules/users/services/users.get.service';
import { AuthCreateSessionService } from './auth.create.session.service';
import { UsersUpdateService } from 'src/modules/users/services/users.update.service';
import { Response } from 'express';

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersGetService: UsersGetService,
    private readonly authCreateSessionService: AuthCreateSessionService,
    private readonly usersUpdateService: UsersUpdateService,
  ) {}

  // FAZ LOGIN E GERA OS TOKENS JWT
  async login(
    loginInput: DtoAuthLoginInput,
    ipAddress: string,
    userAgent: string,
    deviceName: string,
    res: Response,
  ): Promise<DtoAuthLoginResponse> {
    const { username, password } = loginInput;

    // BUSCA O USUÁRIO PELO USERNAME
    const user = await this.usersGetService.getEntityByUsername(username);
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    // COMPARA SENHA COM HASH
    const valid = await ComparePassword(password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    // ATUALIZA ÚLTIMO LOGIN
    await this.usersUpdateService.updateLastLogin(user.idtb_users);

    // DEFINE O PAYLOAD DO TOKEN
    const payload = {
      sub: user.idtb_users,
      email: user.email,
      username: user.username,
      status: user.status,
    };

    // GERA ACCESS TOKEN
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

    // GERA REFRESH TOKEN
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    // CRIA SESSÃO NO BANCO
    await this.authCreateSessionService.createSession({
      user,
      accessToken,
      refreshToken,
      ipAddress,
      userAgent,
      deviceName,
      refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // DEFINE COOKIES HTTP COM OS TOKENS
    SetAuthCookies(res, refreshToken, accessToken);

    // RETORNA O RESPONSE DTO
    return {
      accessToken
    };
  }
}