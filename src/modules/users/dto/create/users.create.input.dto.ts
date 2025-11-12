import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class DtoCreateUsersInput {
  @ApiProperty({ example: '708491@julio', description: 'Nome de usuário para login' })
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  username: string;

  @ApiProperty({ example: 'Senha@123', description: 'Senha de 8 a 20 caracteres' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 'Julio', description: 'Primeiro nome do usuário' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'Santos', description: 'Sobrenome do usuário' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  last_name: string;

  @ApiProperty({ example: '12345678900', description: 'Número do documento (CPF, RG, etc)' })
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  document_number: string;

  @ApiProperty({ example: 'julio@email.com', description: 'E-mail do usuário' })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  email: string;

  @ApiProperty({ example: '+55 11 91234-5678', description: 'Telefone com DDD e código do país' })
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  phone: string;
}