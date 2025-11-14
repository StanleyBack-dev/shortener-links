import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LinksCreateService } from '../../services/create/links.create.service';
import { DtoCreateLinksInput } from '../../dto/create/links.create.input.dto';
import { DtoCreateLinksResponse } from '../../dto/create/links.create.response.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Links')
@Controller('links')
export class LinksCreateController {
    constructor(
        private readonly linksCreateService: LinksCreateService,
    ) { }

    @Post()
    @Public()
    @ApiOperation({ summary: 'Encurta uma URL' })
    @ApiResponse({ status: 201, description: 'URL encurtada com sucesso', type: DtoCreateLinksResponse })
    @ApiBearerAuth()
    async createLink(
        @Body() data: DtoCreateLinksInput,
        @Req() req: any,
    ): Promise<DtoCreateLinksResponse> {
        const userId = req.userId;

        return this.linksCreateService.execute(data, userId);
    }
}