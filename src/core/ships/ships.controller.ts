import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('ships')
@ApiTags('ships')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.OPERATOR, Role.ADMIN)
export class ShipsController {
  constructor(private readonly shipsService: ShipsService,
  ) {
  }

  @Post()
  @ApiBody({ type: CreateShipDto })
  create(@Body() createShipDto: CreateShipDto) {
    return this.shipsService.create(createShipDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.OPERATOR, Role.CREW_MEMBER)
  findAll(@Query('search') searchTerm?: string) {
    return this.shipsService.findAll(searchTerm);
  }

  @Get('by-id/:id')
  @Roles(Role.ADMIN, Role.OPERATOR, Role.CREW_MEMBER)
  findOne(@Param('id') id: string) {
    return this.shipsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateShipDto })
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

  @Post(':id/assign')
  @ApiBody({ type: CreateAndAssignUserDto })
  assignUser(@Param('id') id: string, @Body() createAndAssignUserDto: CreateAndAssignUserDto) {
    return this.shipsService.createUserAndAssignCrewToShip(createAndAssignUserDto, +id);
  }

  @Get('/main')
  main() {
    return this.shipsService.main();
  }

}
