import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current.users';
import { LinksCreateService } from '../services/links.create.service';
import { DtoCreateLinksInput } from '../dto/links.create.input.dto';
import { DtoCreateLinksResponse } from '../dto/links.create.response.dto';
import { Users } from 'src/modules/users/entities/users.entity';

@ApiTags('Links')
@Controller('links')
export class LinksCreateController {
    constructor(private readonly linksCreateService: LinksCreateService) { }

    @Post()
    @ApiOperation({ summary: 'Encurta uma URL' })
    @ApiResponse({ status: 201, description: 'URL encurtada com sucesso', type: DtoCreateLinksResponse })
    @ApiBearerAuth()
    async createLink(
        @Body() data: DtoCreateLinksInput,
        @CurrentUser() user: Users,
    ): Promise<DtoCreateLinksResponse> {
        return this.linksCreateService.execute(data, user);
    }
}