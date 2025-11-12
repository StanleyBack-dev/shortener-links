import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Links } from '../entities/links.entity';
import { DtoCreateLinksInput } from '../dto/links.create.input.dto';
import { DtoCreateLinksResponse } from '../dto/links.create.response.dto';
import { Users } from 'src/modules/users/entities/users.entity';

@Injectable()
export class LinksCreateService {
    constructor(
        @InjectRepository(Links)
        private readonly linksRepository: Repository<Links>,
    ) { }

    // CRIA UM LINK ENCURTADO
    async execute(
        data: DtoCreateLinksInput,
        user?: Users, // usuário autenticado, opcional
    ): Promise<DtoCreateLinksResponse> {

        let shortCode: string;
        do {
            shortCode = Math.random().toString(36).substring(2, 8);
        } while (await this.linksRepository.findOne({ where: { short_code: shortCode } }));

        const link = this.linksRepository.create({
            original_url: data.url,
            short_code: shortCode,
            user: user || undefined,
        });


        // SALVA NO BANCO
        const savedLink = await this.linksRepository.save(link);

        // MONTA A URL COMPLETA (com o domínio do sistema)
        const short_url = `http://localhost:4000/${shortCode}`;

        return new DtoCreateLinksResponse({
            ...savedLink,
            short_url,
            click_count: 0,
        });
    }
}