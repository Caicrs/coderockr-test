import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
} from 'class-validator';

export class CreateWithdrawalDto {
  @ApiProperty({
    description: 'Withdrawal amount',
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
