import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CollectionRecordsService } from './collection-records.service';
import { CreateCollectionRecordDto } from './dto/create-collection-record.dto';
import { UpdateCollectionRecordDto } from './dto/update-collection-record.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { RoleGuard } from '@/common/guard/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('collection-records')
@ApiTags('collection-records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN, Role.OPERATOR, Role.CREW_MEMBER)
export class CollectionRecordsController {
  constructor(private readonly collectionRecordsService: CollectionRecordsService) {}

  @Post()
  @ApiBody({ type: CreateCollectionRecordDto })
  create(@Body() createCollectionRecordDto: CreateCollectionRecordDto) {
    return this.collectionRecordsService.create(createCollectionRecordDto);
  }

  @Get()
  findAll() {
    return this.collectionRecordsService.findAll();
  }

  @Get('by-id/:id')
  findOne(@Param('id') id: string) {
    return this.collectionRecordsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCollectionRecordDto })
  update(@Param('id') id: string, @Body() updateCollectionRecordDto: UpdateCollectionRecordDto) {
    return this.collectionRecordsService.update(+id, updateCollectionRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionRecordsService.remove(+id);
  }

@Get('/average-amounts/:shipId')
  getAverageAmounts(@Param('shipId') shipId: string) {
    return this.collectionRecordsService.getSumByMonth(+shipId)
  }

  @Get('/total-treated-amount')
  getTotalRecords() {
    return this.collectionRecordsService.getTotalTreatedAmountByMonth()
  }
}
