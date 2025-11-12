import { ApiProperty } from '@nestjs/swagger';

export class DtoGetUsersResponse {
  @ApiProperty({ example: 1 })
  idtb_users: number;

  @ApiProperty({ example: 'USR-5121' })
  public_id_users: string;

  @ApiProperty({ example: '709302@julio' })
  username: string;

  @ApiProperty({ example: 'Julio' })
  name: string;

  @ApiProperty({ example: 'Santos' })
  last_name: string;

  @ApiProperty({ example: '12345678900' })
  document_number: string;

  @ApiProperty({ example: 'julio@email.com' })
  email: string;

  @ApiProperty({ example: '+55 11 91234-5678' })
  phone: string;

  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: false })
  first_access: boolean;

  @ApiProperty({ example: '2025-11-12T09:00:00Z', required: false })
  last_access_at?: Date;

  @ApiProperty({ example: '2025-11-10T15:00:00Z', required: false })
  inactivated_at?: Date;

  @ApiProperty({ example: '2025-11-01T10:00:00Z' })
  created_at: Date;

  @ApiProperty({ example: '2025-11-12T09:00:00Z', required: false })
  updated_at?: Date;
}