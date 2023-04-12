import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { RoleGuard } from '@/common/guard/role.guard';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { User } from '@/core/users/entities/user.entity';
import { CreateAndAssignUserDto } from '@/core/ships/dto/create-and-assign-user.dto';

@Controller('ships')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.OPERATOR, Role.ADMIN)
export class ShipsController {
  constructor(private readonly shipsService: ShipsService
  ) {
  }

  @Post()
  create(@Body() createShipDto: CreateShipDto) {
    return this.shipsService.create(createShipDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.OPERATOR, Role.CREW_MEMBER)
  findAll() {
    return this.shipsService.findAll();
  }

  @Get('by-id/:id')
  @Roles(Role.ADMIN, Role.OPERATOR, Role.CREW_MEMBER)
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

  @Get('/by-user-id')
  @Roles(Role.ADMIN, Role.OPERATOR, Role.CREW_MEMBER)
  getShipsByUserId(@CurrentUser() user: User) {
    return this.shipsService.getShipsByUserId(user.id);
  }

  @Post(':id/crew')
  assignUser(@Param('id') id: string, @Body() createAndAssignUserDto: CreateAndAssignUserDto) {
    return this.shipsService.createUserAndAssignCrewToShip(createAndAssignUserDto, +id);
  }


}
