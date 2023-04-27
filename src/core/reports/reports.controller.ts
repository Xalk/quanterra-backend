import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { RoleGuard } from '@/common/guard/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('reports')
@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN, Role.OPERATOR, Role.CREW_MEMBER)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiBody({ type: CreateReportDto })
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

}
