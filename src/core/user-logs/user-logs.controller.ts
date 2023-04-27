import { Controller, Get, Post, Body,  UseGuards } from '@nestjs/common';
import { UserLogsService } from './user-logs.service';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { RoleGuard } from '@/common/guard/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('user-logs')
@ApiTags('user-logs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN)
export class UserLogsController {
  constructor(private readonly userLogsService: UserLogsService) {}

  @Post()
  @ApiBody({ type: CreateUserLogDto })
  create(@Body() createUserLogDto: CreateUserLogDto) {
    return this.userLogsService.create(createUserLogDto);
  }

  @Get()
  findAll() {
    return this.userLogsService.findAll();
  }

}
