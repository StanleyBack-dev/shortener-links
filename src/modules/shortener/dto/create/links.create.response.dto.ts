import { ApiProperty } from '@nestjs/swagger';

export class DtoCreateLinksResponse {
  @ApiProperty({ example: 1, description: 'Identificador interno do link' })
  id_link: number;

  @ApiProperty({ example: 'aZbKq7', description: 'Código encurtado gerado para o link' })
  short_code: string;

  @ApiProperty({
    example: 'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
    description: 'URL original informada pelo usuário',
  })
  original_url: string;

  @ApiProperty({
    example: 'http://localhost/aZbKq7',
    description: 'URL encurtada completa retornada pela API',
  })
  short_url: string;

  @ApiProperty({
    example: 12,
    description: 'Número total de cliques registrados neste link',
    default: 0,
  })
  click_count: number;

  @ApiProperty({
    example: 3,
    description: 'ID do usuário dono do link (nulo se anônimo)',
    nullable: true,
  })
  id_user?: number;

  @ApiProperty({
    example: null,
    description: 'Data de exclusão lógica, nula enquanto o link estiver ativo',
    nullable: true,
  })
  inactivated_at?: Date | null;

  @ApiProperty({
    example: '2025-11-12T12:45:30.000Z',
    description: 'Data de criação do link',
  })
  created_at: Date;

  @ApiProperty({
    example: '2025-11-12T13:10:05.000Z',
    description: 'Data da última atualização',
    nullable: true,
  })
  updated_at?: Date | null;

  // CONSTRUTOR PARA CRIAR DIRETO A PARTIR DA ENTIDADE
  constructor(partial: Partial<DtoCreateLinksResponse>) {
    Object.assign(this, partial);
  }
}