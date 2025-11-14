import { Controller, Param, Req, UseGuards, Delete } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt.auth.guard";
import { LinksDeleteService } from "../../services/delete/links.delete.service";
import { DtoDeleteLinkResponse } from "../../dto/delete/links.delete.response.dto";

@ApiTags('Links')
@ApiBearerAuth()
@Controller('links')
export class LinksDeleteController {
    constructor(private readonly linkDeleteService: LinksDeleteService) {}

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({
        summary: 'Inativar uma URL que está Ativa',
        description: 'Permite que o usuário autenticado inative alguma URL original de um link encurtado de sua propriedade.'
    })
    @ApiOkResponse({
        description: 'Link inativado com sucesso',
        type: DtoDeleteLinkResponse,
    })
    @ApiNotFoundResponse({
        description: 'Link não encontrado ou já foi inativado',

    })
    async deleteLink(
        @Param('id') id: number,
        @Req() req: any,
    ): Promise<DtoDeleteLinkResponse> {
        const userId = req.userId;

        const deleteLink = await this.linkDeleteService.deleteLink(id, userId);

        // RETORNA A RESPOSTA FORMATADA PRO SWAGGER
        return new DtoDeleteLinkResponse({
            id_link: deleteLink.idtb_links,
            url: deleteLink.original_url,
            short_code: deleteLink.short_code,
            short_url: `http://localhost:4000/${deleteLink.short_code}`,
            click_count: deleteLink.click_count,
            created_at: deleteLink.created_at,
            updated_at: deleteLink.updated_at,
            inactivated_at: deleteLink.inactivated_at,
        });
    }
}