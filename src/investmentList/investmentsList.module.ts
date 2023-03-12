import { Module } from '@nestjs/common';
import { InvestmentListService } from './investmentsList.service';
import { InvestmentListController } from './investmentsList.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    })
  ],
  controllers: [InvestmentListController],
  providers: [InvestmentListService,AuthService,JwtStrategy],
})
export class InvestmentsListModule {}
