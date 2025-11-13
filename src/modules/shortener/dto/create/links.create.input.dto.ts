import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsUrl } from "class-validator";

export class DtoCreateLinksInput {
  @ApiProperty({
    example: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
    description: 'URL a ser encurtada',
  })
  @IsString()
  @IsUrl({}, { message: 'Informe uma URL válida' })
  @MinLength(10)
  @MaxLength(2048)
  url: string;
}