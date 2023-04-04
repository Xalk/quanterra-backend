import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WastesService } from './wastes.service';
import { CreateWasteDto } from './dto/create-waste.dto';
import { UpdateWasteDto } from './dto/update-waste.dto';

@Controller('wastes')
export class WastesController {
  constructor(private readonly wastesService: WastesService) {
  }

  @Post()
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
  update(@Param('id') id: string, @Body() updateWasteDto: UpdateWasteDto) {
    return this.wastesService.update(+id, updateWasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wastesService.remove(+id);
  }
}
