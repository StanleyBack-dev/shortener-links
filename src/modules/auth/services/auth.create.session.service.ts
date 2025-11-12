import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../entities/auth.entity';
import { Users } from 'src/modules/users/entities/users.entity';

@Injectable()
export class AuthCreateSessionService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
  ) {}

  async createSession(data: {
    user: Users;
    accessToken: string;
    refreshToken: string;
    ipAddress: string;
    userAgent: string;
    deviceName: string;
    refreshTokenExpiresAt: Date;
  }) {
    const session = this.authRepo.create({
      idtb_users: data.user.idtb_users,
      access_token: data.accessToken,
      refresh_token: data.refreshToken,
      ip_address: data.ipAddress,
      user_agent: data.userAgent,
      device_name: data.deviceName,
      refresh_token_expires_at: data.refreshTokenExpiresAt,
      session_active: true,
      is_revoked: false,
    });

    return this.authRepo.save(session);
  }
}