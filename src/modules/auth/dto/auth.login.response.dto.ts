import { ApiProperty } from '@nestjs/swagger';

export class DtoAuthLoginResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT de acesso (expira em 15 minutos)',
  })
  accessToken: string;
}