import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';

export class CreateInvestmentListDto {
  @ApiProperty({
    description: 'Investment amount',
    example: 2400,
  })
  amount: number;

  @IsString()
  @ApiProperty({
    description: 'Investment ID',
    example: 'investment-id',
  })
  investmentId: string;
}
