import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvestmentDto } from './dto/create-investments.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { InvestmentInterface } from './entities/investments.entity';
 
@Injectable()
export class InvestmentService {
  constructor(private readonly prisma: PrismaService,
    private readonly authService: AuthService) {}

  async create(dto: CreateInvestmentDto) {
    const data = {
      title: dto.title,
      monthDuration: dto.monthDuration,
      gain: 0.52
    };

    const result = this.prisma.investments
      .create({
        data,
        select: { title: true, monthDuration: true},
      })
      .catch(this.handleError);

      return result;
  }
  private investmentSelect = {
    id: true,
    title: true,
    monthDuration: true,
  };

  
  findAll() {
    return this.prisma.investments.findMany({
      select: this.investmentSelect,
    });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'An error occurred while performing this operation',
    );
  }
}
