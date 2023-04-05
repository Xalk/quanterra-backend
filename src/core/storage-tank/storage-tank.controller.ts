import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StorageTankService } from './storage-tank.service';
import { CreateStorageTankDto } from './dto/create-storage-tank.dto';
import { UpdateStorageTankDto } from './dto/update-storage-tank.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { RoleGuard } from '@/common/guard/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';

@Controller('storage-tank')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN)
export class StorageTankController {
  constructor(private readonly storageTankService: StorageTankService) {}

  @Post()
  create(@Body() createStorageTankDto: CreateStorageTankDto) {
    return this.storageTankService.create(createStorageTankDto);
  }

  @Get()
  findAll() {
    return this.storageTankService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageTankService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorageTankDto: UpdateStorageTankDto) {
    return this.storageTankService.update(+id, updateStorageTankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageTankService.remove(+id);
  }
}
