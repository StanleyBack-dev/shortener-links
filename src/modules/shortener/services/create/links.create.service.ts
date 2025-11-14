import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Links } from '../../entities/links.entity';
import { Users } from 'src/modules/users/entities/users.entity';
import { DtoCreateLinksInput } from '../../dto/create/links.create.input.dto';
import { DtoCreateLinksResponse } from '../../dto/create/links.create.response.dto';

@Injectable()
export class LinksCreateService {
  constructor(
    @InjectRepository(Links)
    private readonly linksRepository: Repository<Links>,
  ) {}

  async execute(data: DtoCreateLinksInput, user?: Users): Promise<DtoCreateLinksResponse> {
    let shortCode: string;
    do {
      shortCode = Math.random().toString(36).substring(2, 8);
    } while (await this.linksRepository.findOne({ where: { short_code: shortCode } }));

    const link = this.linksRepository.create({
      original_url: data.url,
      short_code: shortCode,
      user: user || undefined
    });

    const savedLink = await this.linksRepository.save(link);
    const short_url = `http://localhost:4000/${shortCode}`;

    return new DtoCreateLinksResponse({
      ...savedLink,
      short_url,
      click_count: 0,
    });
  }
}