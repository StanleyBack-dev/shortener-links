import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users.entity';
import { DtoGetUsersInput } from '../../dto/get/users.get.input.dto';
import { DtoGetUsersResponse } from '../../dto/get/users.get.response.dto';

@Injectable()
export class UsersGetService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
    ) { }

    async getAllUsers(filters: DtoGetUsersInput): Promise<DtoGetUsersResponse[]> {
        const where: any = {};

        if (filters.username) where.username = filters.username;
        if (filters.email) where.email = filters.email;
        if (filters.document_number) where.document_number = filters.document_number;
        if (filters.name) where.name = filters.name;
        if (filters.status !== undefined)
            where.status = filters.status === 'true';

        const users = await this.userRepository.find({ where });

        return users.map((u) => ({
            idtb_users: u.idtb_users,
            public_id_users: u.public_idtb_users,
            username: u.username,
            name: u.name,
            last_name: u.last_name,
            document_number: u.document_number,
            email: u.email,
            phone: u.phone,
            status: u.status,
            first_access: u.first_access,
            last_access_at: u.last_access_at,
            inactivated_at: u.inactivated_at,
            created_at: u.created_at,
            updated_at: u.updated_at,
        }));
    }


    async getByIdUsers(idtb_users: number): Promise<DtoGetUsersResponse | null> {
        const user = await this.userRepository.findOne({
            where: { idtb_users },
        });
        if (!user) return null;

        return {
            idtb_users: user.idtb_users,
            public_id_users: user.public_idtb_users,
            username: user.username,
            name: user.name,
            last_name: user.last_name,
            document_number: user.document_number,
            email: user.email,
            phone: user.phone,
            status: user.status,
            first_access: user.first_access,
            last_access_at: user.last_access_at,
            inactivated_at: user.inactivated_at,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }

    async getEntityByUsername(username: string): Promise<Users | null> {
        return this.userRepository.findOne({
            where: { username },
        });
    }

    async getEntityById(idtb_users: number): Promise<Users | null> {
        return this.userRepository.findOne({
            where: { idtb_users },
        });
    }
}