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
import { InvestmentService} from './investments.service';
import { CreateInvestmentDto } from './dto/create-investments.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user-decorator';
import { User } from '@prisma/client';

@ApiTags('investments')
@Controller('investments')
export class InvestmentController {
  constructor(
    private readonly investmentService: InvestmentService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create investments | only admins',
  })
  create(@Body() createInvestmentDto: CreateInvestmentDto) {
    return this.investmentService.create(createInvestmentDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List of all the disponible investments',
  })
  findAll() {
    return this.investmentService.findAll();
  }
}
