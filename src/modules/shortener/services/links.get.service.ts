import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Links } from '../entities/links.entity';

@Injectable()
export class LinksGetService {
  constructor(
    @InjectRepository(Links)
    private readonly linksRepository: Repository<Links>,
  ) {}

  async getByShortCode(shortCode: string): Promise<Links | null> {
    return this.linksRepository.findOne({ where: { short_code: shortCode } });
  }

  async incrementClickCount(id: number): Promise<void> {
    await this.linksRepository.increment({ idtb_links: id }, 'click_count', 1);
  }
}
