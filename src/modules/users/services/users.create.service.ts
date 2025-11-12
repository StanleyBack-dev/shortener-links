import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashPassword } from '../../../utils/hash.util';
import { Users } from '../entities/users.entity';
import { DtoCreateUsersInput } from '../dto/create/users.create.input.dto';
import { DtoCreateUsersResponse } from '../dto/create/users.create.response';

@Injectable()
export class UsersCreateService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  // CRIA UM NOVO USUÁRIO E RETORNA O DTO DE RESPOSTA
  async execute(data: DtoCreateUsersInput): Promise<DtoCreateUsersResponse> {
    const { password, ...rest } = data;

    // GERA O HASH DA SENHA SE EXISTIR
    const hashedPassword = password ? await HashPassword(password) : undefined;

    // CRIA O USUÁRIO
    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    // RETORNA O DTO DE RESPOSTA FORMATADO
    return new DtoCreateUsersResponse({
      idtb_users: savedUser.idtb_users,
      public_id_users: savedUser.public_idtb_users,
      username: savedUser.username,
      name: savedUser.name,
      last_name: savedUser.last_name,
      document_number: savedUser.document_number,
      email: savedUser.email,
      phone: savedUser.phone,
      status: savedUser.status,
      first_access: savedUser.first_access,
      last_access_at: savedUser.last_access_at,
      inactivated_at: savedUser.inactivated_at,
      created_at: savedUser.created_at,
      updated_at: savedUser.updated_at,
    });
  }
}