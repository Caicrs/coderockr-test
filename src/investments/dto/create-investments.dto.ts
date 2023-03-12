import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';

export class CreateInvestmentDto {
  @IsString()
  @ApiProperty({
    description: 'Investment title',
    example: 'CDB PREFIXADO',
  })
  title: string;

  @ApiProperty({
    description: 'Investment duration',
    example: 1,
  })
  monthDuration: number;
}
