import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, IsNull } from "typeorm";
import { Links } from "../entities/links.entity";

@Injectable()
export class LinksDeleteService {
    constructor(
        @InjectRepository(Links)
        private readonly linkRepository: Repository<Links>,
    ) {}

    async deleteLink(
        idLink: number,
        idUser: number,
    ): Promise<Links> {

        const link = await this.linkRepository.findOne({
            where: {
                idtb_links: idLink,
                user: { idtb_users: idUser },
                inactivated_at: IsNull(),
            },
        });

        if(!link){
            throw new NotFoundException('Link não encontrado ou já foi inativado');
        }

        link.updated_at = new Date();
        link.inactivated_at = new Date();

        await this.linkRepository.save(link);

        return link;
    }
}