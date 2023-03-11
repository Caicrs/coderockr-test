import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Username',
    example: 'Name example',
  })
  name: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'This password is too weak',
  })
  @ApiProperty({
    description: 'Password',
    example: '12345#Password',
  })
  password: string;

  @IsUrl()
  @ApiProperty({
    description: 'Email',
    example: 'example@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Document number',
    example: '032.156.627-10',
  })
  cpf: string;

}
