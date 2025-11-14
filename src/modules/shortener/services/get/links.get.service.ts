import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Links } from '../../entities/links.entity';

@Injectable()
export class LinksGetService {
  constructor(
    @InjectRepository(Links)
    private readonly linksRepository: Repository<Links>,
  ) {}

  async getAllLinksByIdUser(idUsers: number): Promise<Links[]> {
    return this.linksRepository.find({
      where: {
        user: { idtb_users: idUsers },
        inactivated_at: IsNull(),
      },
      order: { created_at: 'DESC' },
    });
  }

  async getByShortCode(shortCode: string): Promise<Links | null> {
    return this.linksRepository.findOne({ where: { short_code: shortCode } });
  }

  async incrementClickCount(id: number): Promise<void> {
    await this.linksRepository.increment({ idtb_links: id }, 'click_count', 1);
  }
}
