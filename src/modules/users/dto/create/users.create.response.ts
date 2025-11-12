import { ApiProperty } from '@nestjs/swagger';

export class DtoCreateUsersResponse {
  @ApiProperty()
  idtb_users: number;

  @ApiProperty()
  public_id_users: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  document_number: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  first_access: boolean;

  @ApiProperty({ nullable: true })
  last_access_at?: Date;

  @ApiProperty({ nullable: true })
  inactivated_at?: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ nullable: true })
  updated_at?: Date;

  // CONSTRUTOR PARA FACILITAR A CRIAÇÃO A PARTIR DE UM USER ENTITY
  constructor(partial: Partial<DtoCreateUsersResponse>) {
    Object.assign(this, partial);
  }
}
