import { Controller, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import { LinksUpdateService } from '../../services/update/links.update.service';
import { DtoUpdateLinkInput } from '../../dto/update/links.update.input.dto';
import { DtoUpdateLinkResponse } from '../../dto/update/links.update.response.dto';

@ApiTags('Links')
@ApiBearerAuth()
@Controller('links')
export class LinksUpdateController {
  constructor(private readonly linksUpdateService: LinksUpdateService) {}

  // PROTEGE A ROTA (SOMENTE USUÁRIOS AUTENTICADOS)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar o endereço de destino de um link encurtado',
    description:
      'Permite que o usuário autenticado atualize a URL original de um link encurtado de sua propriedade.',
  })
  @ApiOkResponse({
    description: 'Link atualizado com sucesso',
    type: DtoUpdateLinkResponse,
  })
  @ApiNotFoundResponse({
    description: 'Link não encontrado ou já foi inativado',
  })
  async updateLink(
    @Param('id') id: number,
    @Body() dto: DtoUpdateLinkInput,
    @Req() req: any,
  ): Promise<DtoUpdateLinkResponse> {
    const userId = req.userId;

    const updatedLink = await this.linksUpdateService.updateLink(id, userId, dto);

    // RETORNA A RESPOSTA FORMATADA PRO SWAGGER
    return new DtoUpdateLinkResponse({
      id_link: updatedLink.idtb_links,
      url: updatedLink.original_url,
      short_code: updatedLink.short_code,
      short_url: `http://localhost:4000/${updatedLink.short_code}`,
      click_count: updatedLink.click_count,
      created_at: updatedLink.created_at,
      updated_at: updatedLink.updated_at,
      inactivated_at: updatedLink.inactivated_at,
    });
  }
}