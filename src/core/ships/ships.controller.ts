import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { RoleGuard } from '@/common/guard/role.guard';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';

@Controller('ships')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.ADMIN)
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @Post()
  create(@Body() createShipDto: CreateShipDto) {
    return this.shipsService.create(createShipDto);
  }

  @Get()
  @Roles(Role.CREW_MEMBER)
  findAll() {
    return this.shipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipDto: UpdateShipDto) {
    return this.shipsService.update(+id, updateShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipsService.remove(+id);
  }
}
