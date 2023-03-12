import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvestmentListDto } from './dto/create-investmentList.dto';
import { Prisma } from '@prisma/client';
import { UpdateInvestmentListDto } from './dto/update-investmentList.dto';

@Injectable()
export class InvestmentListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInvestmentListDto, userId: string) {
    const data: Prisma.InvestmentListCreateInput = {
      startDate: new Date(),
      endDate: new Date(),
      amount: dto.amount,
      active: true,
      investment: { connect: { id: dto.investmentId } },
      owner: { connect: { id: userId } },
    };

    const result = this.prisma.investmentList
      .create({
        data,
        select: this.investmentSelect,
      })
      .catch(this.handleError);

    return result;
  }
  private investmentSelect = {
    id: true,
    startDate: true,
    endDate: true,
    amount: true,
    active: true,
    investmentId: true,
    investment: true,
    ownerId: true,
  };

  findByQuery(userId: string) {
    return this.prisma.investmentList.findMany({
      where: { ownerId: userId },
      select: this.investmentSelect,
    });
  }

  async findById(id: string) {
    const record = await this.prisma.investmentList.findUnique({
      where: { id },
      select: this.investmentSelect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado.`);
    }

    return record;
  }

  async update(id: string, dto: UpdateInvestmentListDto) {
    await this.findById(id);

    const data: Prisma.InvestmentListUpdateInput = {
      ...dto,
    };

    return this.prisma.investmentList.update({
      where: { id },
      data,
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
