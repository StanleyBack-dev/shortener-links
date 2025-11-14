import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users.entity';

@Injectable()
export class UsersValidationService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findConflictFields(
    username: string,
    email: string,
    document: string,
  ): Promise<Users | null> {

    return this.userRepository.findOne({
      where: [
        { username },
        { email },
        { document_number: document },
      ],
    });
  }
}