import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users.entity';

@Injectable()
export class UsersUpdateService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async updateUsers(
    idtb_users: number,
    data: {
      name?: string;
      last_name?: string;
      username?: string;
      document_number?: string;
      email?: string;
      phone?: string;
      first_access?: boolean; 
      status?: boolean;
      inactivated_at?: Date;
    }
  ): Promise<Users> {

    const user = await this.usersRepository.findOne({ where: { idtb_users } });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    return await this.usersRepository.save(user);
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.usersRepository.update(userId, {
      last_access_at: new Date(),
    });
  }
}