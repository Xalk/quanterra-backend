import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CrewMembersService } from './crew-members.service';
import { CreateCrewMemberDto } from './dto/create-crew-member.dto';
import { UpdateCrewMemberDto } from './dto/update-crew-member.dto';
import { JwtAuthGuard } from '@/common/guard/jwt-auth.guard';

@Controller('crew-members')
@UseGuards(JwtAuthGuard)
export class CrewMembersController {
  constructor(private readonly crewMembersService: CrewMembersService) {}


  @Post()
  create(@Body() createCrewMemberDto: CreateCrewMemberDto) {
    return this.crewMembersService.create(createCrewMemberDto);
  }

  @Get()
  findAll() {
    return this.crewMembersService.findAll();
  }

  @Get(':id')
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
