import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { InvestmentListService } from './investmentsList.service';
import { CreateInvestmentListDto } from './dto/create-investmentList.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user-decorator';
import { User } from '@prisma/client';
import millisecondsConverter from './helper/dateLogic';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';

@ApiTags('manage')
@Controller('manage')
export class InvestmentListController {
  constructor(private readonly investmentService: InvestmentListService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Make investment',
  })
  @ApiBearerAuth()
  create(
    @LoggedUser() user: User,
    @Body() createInvestmentListDto: CreateInvestmentListDto,
  ) {
    return this.investmentService.create(createInvestmentListDto, user.id);
  }

  @Get('/my-investments')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List of all investments by this user',
  })
  async findAll(@LoggedUser() user: User) {
    const thisDay: any = new Date();
    const list = await this.investmentService.findByQuery(user.id);
    const arr = [];
    list.map((item: any) => {
      if (item.active) {
        const resultDate = millisecondsConverter(thisDay - item.startDate);
        let currentBalance = item.amount;
        let expectedBalanceCalc = item.amount;
        if (resultDate.month > item.investment.monthDuration) {
          // Update investmentList for ( active:false )
          const data = {
            id: item.id,
            message: 'Investment finished',
          };
          arr.push(data);
        } else {
          for (let i = 0; i < resultDate.month; i++) {
            currentBalance = currentBalance + (0.52 * currentBalance) / 100;
          }
          for (let i = 0; i < item.investment.monthDuration; i++) {
            expectedBalanceCalc =
              expectedBalanceCalc + (0.52 * expectedBalanceCalc) / 100;
          }
          const result = {
            initialAmount: item.amount,
            currentBalance: parseFloat(currentBalance.toFixed(2)),
            expectedBalance: parseFloat(expectedBalanceCalc.toFixed(2)),
          };
          arr.push(result);
        }
      } else {
        arr.push(item);
      }
    });
    return arr;
  }

  @Post('/withdrawal')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Make investment',
  })
  @ApiBearerAuth()
  async createWithdrawal(@Body() createWithdrawalDto: CreateWithdrawalDto) {
    const data = {
      amount: createWithdrawalDto.amount,
      active: false,
    };
    return this.investmentService.update(
      createWithdrawalDto.investmentId,
      data,
    );
  }
}
