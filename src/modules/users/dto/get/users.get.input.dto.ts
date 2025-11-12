import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBooleanString } from 'class-validator';

export class DtoGetUsersInput {
  @ApiPropertyOptional({
    example: 'joaosilva',
    description: 'Filtra usuários pelo username',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    example: 'joao@email.com',
    description: 'Filtra usuários pelo e-mail',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    example: '12345678900',
    description: 'Filtra usuários pelo número do documento (CPF, RG, etc)',
  })
  @IsOptional()
  @IsString()
  document_number?: string;

  @ApiPropertyOptional({
    example: 'João',
    description: 'Filtra usuários pelo nome',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'true',
    description: 'Filtra usuários pelo status (true = ativo, false = inativo)',
  })
  @IsOptional()
  @IsBooleanString()
  status?: string;
}