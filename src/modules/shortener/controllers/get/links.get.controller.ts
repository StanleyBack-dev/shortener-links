import { UseGuards, Controller, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import { ApiTags, ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LinksGetService } from '../../services/links.get.service';
import { DtoGetLinksResponse } from '../../dto/get/links.get.response.dto';

@ApiTags('Links')
@ApiBearerAuth()
@Controller('links')
export class LinksGetController {
  constructor(private readonly linksGetService: LinksGetService) {}

  // PROTEGE A ROTA ( SOMENTE USUÁRIOS AUTENTICADOS )
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Listar todos os links encurtados do usuário autenticado',
    description:
      'Retorna todos os links criados pelo usuário autenticado, ordenados por data de criação (mais recentes primeiro).',
  })
  @ApiOkResponse({
    description: 'Lista de links encurtados do usuário autenticado',
    type: [DtoGetLinksResponse],
  })
  async getAllLinksByUser(@Req() req: any): Promise<DtoGetLinksResponse[]> {
    const userId = req.userId;

    // BUSCA TODOS OS LINKS DO USUÁRIO
    const links = await this.linksGetService.getAllLinksByIdUser(userId);

    // MONTA A RESPOSTA FORMATADA PRO SWAGGER
    return links.map(
      (link) =>
        new DtoGetLinksResponse({
          id_links: link.idtb_links,
          url: link.original_url,
          short_code: link.short_code,
          short_url: `http://localhost:4000/${link.short_code}`,
          click_count: link.click_count,
          created_at: link.created_at,
          updated_at: link.updated_at,
          inactivated_at: link.inactivated_at,
        }),
    );
  }
}
