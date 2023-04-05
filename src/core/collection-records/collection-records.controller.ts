import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CollectionRecordsService } from './collection-records.service';
import { CreateCollectionRecordDto } from './dto/create-collection-record.dto';
import { UpdateCollectionRecordDto } from './dto/update-collection-record.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { RoleGuard } from '@/common/guard/role.guard';

@Controller('collection-records')
@UseGuards(JwtAuthGuard, RoleGuard)
export class CollectionRecordsController {
  constructor(private readonly collectionRecordsService: CollectionRecordsService) {}

  @Post()
  create(@Body() createCollectionRecordDto: CreateCollectionRecordDto) {
    return this.collectionRecordsService.create(createCollectionRecordDto);
  }

  @Get()
  findAll() {
    return this.collectionRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionRecordDto: UpdateCollectionRecordDto) {
    return this.collectionRecordsService.update(+id, updateCollectionRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionRecordsService.remove(+id);
  }
}
