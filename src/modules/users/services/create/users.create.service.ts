import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashPassword } from '../../../../common/utils/hash.util';
import { Users } from '../../entities/users.entity';
import { DtoCreateUsersInput } from '../../dto/create/users.create.input.dto';
import { DtoCreateUsersResponse } from '../../dto/create/users.create.response';
import { UsersValidationService } from '../validation/users.validation.service';

@Injectable()
export class UsersCreateService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    private readonly usersValidationService: UsersValidationService,
  ) {}

  async execute(data: DtoCreateUsersInput): Promise<DtoCreateUsersResponse> {
    const exists = await this.usersValidationService.findConflictFields(
      data.username,
      data.email,
      data.document_number,
    );

    if (exists) {
      throw new ConflictException('Não foi possível criar o usuário.');
    }

    const { password, ...rest } = data;
    const hashedPassword = password ? await HashPassword(password) : undefined;

    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    return new DtoCreateUsersResponse({
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