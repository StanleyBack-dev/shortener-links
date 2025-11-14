import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import type { Response } from 'express';
import { LinksGetService } from '../../services/get/links.get.service';

@ApiTags('Links')
@Controller()
export class LinksRedirectController {
  constructor(private readonly linksGetService: LinksGetService) {}

  @Get(':shortCode')
  @Public()
  @ApiOperation({ summary: 'Redireciona para a URL original' })
  @ApiParam({ name: 'shortCode', description: 'Código da URL encurtada' })
  @ApiResponse({ status: 302, description: 'Redirecionamento para a URL original' })
  @ApiResponse({ status: 404, description: 'Link não encontrado' })
  async redirect(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ) {
    const link = await this.linksGetService.getByShortCode(shortCode);

    if (!link || link.inactivated_at) {
      throw new NotFoundException('Link não encontrado');
    }

    await this.linksGetService.incrementClickCount(link.idtb_links);

    return res.redirect(link.original_url);
  }
}