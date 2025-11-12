import { ApiProperty } from '@nestjs/swagger';

export class DtoCreateUsersResponse {
  @ApiProperty({
    example: 'USR-PZWdDk2VnX',
    description: 'Identificador público único do usuário',
  })
  public_id_users: string;

  @ApiProperty({
    example: '708491@julio',
    description: 'Nome de usuário utilizado para login',
  })
  username: string;

  @ApiProperty({
    example: 'Julio',
    description: 'Primeiro nome do usuário',
  })
  name: string;

  @ApiProperty({
    example: 'Santos',
    description: 'Sobrenome do usuário',
  })
  last_name: string;

  @ApiProperty({
    example: '12345678900',
    description: 'Documento do usuário (CPF, RG, etc)',
  })
  document_number: string;

  @ApiProperty({
    example: 'julio@email.com',
    description: 'Endereço de e-mail do usuário',
  })
  email: string;

  @ApiProperty({
    example: '+55 11 91234-5678',
    description: 'Telefone do usuário com DDD e código do país',
  })
  phone: string;

  @ApiProperty({
    example: true,
    description: 'Status do usuário (ativo ou inativo)',
  })
  status: boolean;

  @ApiProperty({
    example: true,
    description: 'Indica se o usuário ainda está no primeiro acesso',
  })
  first_access: boolean;

  @ApiProperty({
    example: '2025-11-12T18:03:43.914Z',
    description: 'Data e hora do último acesso do usuário',
    nullable: true,
  })
  last_access_at?: Date;

  @ApiProperty({
    example: null,
    description: 'Data em que o usuário foi inativado (se aplicável)',
    nullable: true,
  })
  inactivated_at?: Date;

  @ApiProperty({
    example: '2025-11-12T18:03:43.914Z',
    description: 'Data de criação do registro do usuário',
  })
  created_at: Date;

  @ApiProperty({
    example: '2025-11-12T18:03:43.914Z',
    description: 'Data da última atualização do registro do usuário',
    nullable: true,
  })
  updated_at?: Date;

  // CONSTRUTOR PARA FACILITAR A CRIAÇÃO A PARTIR DE UM USER ENTITY
  constructor(partial: Partial<DtoCreateUsersResponse>) {
    Object.assign(this, partial);
  }
}