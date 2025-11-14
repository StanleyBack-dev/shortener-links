import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Links } from '../../entities/links.entity';
import { DtoUpdateLinkInput } from '../../dto/update/links.update.input.dto';

@Injectable()
export class LinksUpdateService {
  constructor(
    @InjectRepository(Links)
    private readonly linksRepository: Repository<Links>,
  ) {}

  async updateLink(
    idLink: number,
    idUser: number,
    dto: DtoUpdateLinkInput,
  ): Promise<Links> {

    const link = await this.linksRepository.findOne({
      where: {
        idtb_links: idLink,
        user: { idtb_users: idUser },
        inactivated_at: IsNull(),
      },
    });

    if (!link) {
      throw new NotFoundException('Link não encontrado ou já foi inativado');
    }

    link.original_url = dto.url;
    link.updated_at = new Date();
    link.click_count = 0;

    await this.linksRepository.save(link);

    return link;
  }
}