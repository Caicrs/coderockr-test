import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InvestmentsListModule } from './investmentList/investmentsList.module';
import { InvestmentModule } from './investments/investments.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, InvestmentModule,InvestmentsListModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
