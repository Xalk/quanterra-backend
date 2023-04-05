import { Controller, Get, Post, Body,  UseGuards } from '@nestjs/common';
import { UserLogsService } from './user-logs.service';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { RoleGuard } from '@/common/guard/role.guard';

@Controller('user-logs')
@UseGuards(JwtAuthGuard, RoleGuard)
export class UserLogsController {
  constructor(private readonly userLogsService: UserLogsService) {}

  @Post()
  create(@Body() createUserLogDto: CreateUserLogDto) {
    return this.userLogsService.create(createUserLogDto);
  }

  @Get()
  findAll() {
    return this.userLogsService.findAll();
  }

}
