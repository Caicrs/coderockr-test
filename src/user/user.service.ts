import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService,
    private readonly authService: AuthService) {}

  async create(dto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10)
    };

    const myUser = this.prisma.user
      .create({
        data,
        select: { name: true, email: true, cpf: true },
      })
      .catch(this.handleError);

      const loginDto = {
        email: dto.email,
        password: dto.password
      }

      return this.authService.login(loginDto);
  }
  private userSelect = {
    id: true,
    name: true,
    email: true,
    cpf: true,
    createdAt: true,
    updatedAt: true,
  };

  async findById(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!record) {
      throw new NotFoundException(`This user (${id}) was not found`);
    }

    return record;
  }

  async findOne(id: string) {
    return this.findById(id);
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
