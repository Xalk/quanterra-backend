import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CrewMembersService } from './crew-members.service';
import { CreateCrewMemberDto } from './dto/create-crew-member.dto';
import { UpdateCrewMemberDto } from './dto/update-crew-member.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { RoleGuard } from '@/common/guard/role.guard';


@Controller('crew-members')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.OPERATOR, Role.ADMIN)
export class CrewMembersController {
  constructor(private readonly crewMembersService: CrewMembersService) {
  }


  @Post()
  create(@Body() createCrewMemberDto: CreateCrewMemberDto) {
    return this.crewMembersService.create(createCrewMemberDto);
  }


  @Get()
  findAll() {
    return this.crewMembersService.findAll();
  }

  @Get('by-id/:id')
  findOne(@Param('id') id: string) {
    return this.crewMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrewMemberDto: UpdateCrewMemberDto) {
    return this.crewMembersService.update(+id, updateCrewMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crewMembersService.remove(+id);
  }

}
