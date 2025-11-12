import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class DtoAuthLoginInput {
  @ApiProperty({
    example: '708491@julio',
    description: 'Nome de usuário utilizado para login',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  username: string;

  @ApiProperty({
    example: 'senha@123',
    description: 'Senha de acesso (entre 8 e 20 caracteres)',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}