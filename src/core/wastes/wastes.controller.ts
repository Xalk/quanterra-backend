import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WastesService } from './wastes.service';
import { CreateWasteDto } from './dto/create-waste.dto';
import { UpdateWasteDto } from './dto/update-waste.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { RoleGuard } from '@/common/guard/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('wastes')
@ApiTags('wastes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN)
export class WastesController {
  constructor(private readonly wastesService: WastesService) {
  }

  @Post()
  @ApiBody({ type: CreateWasteDto })
  create(@Body() createWasteDto: CreateWasteDto) {
    return this.wastesService.create(createWasteDto);
  }

  @Get()
  findAll() {
    return this.wastesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wastesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateWasteDto })
  update(@Param('id') id: string, @Body() updateWasteDto: UpdateWasteDto) {
    return this.wastesService.update(+id, updateWasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wastesService.remove(+id);
  }
}
