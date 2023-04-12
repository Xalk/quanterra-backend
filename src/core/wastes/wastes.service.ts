import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWasteDto } from './dto/create-waste.dto';
import { UpdateWasteDto } from './dto/update-waste.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Waste } from '@/core/wastes/entities/waste.entity';
import { Repository } from 'typeorm';


@Injectable()
export class WastesService {

  constructor(
    @InjectRepository(Waste) private wasteRepository: Repository<Waste>,
  ) {
  }

  create(createWasteDto: CreateWasteDto) {
    const waste = this.wasteRepository.create(createWasteDto);
    return this.wasteRepository.save(waste);
  }

  findAll() {
    return this.wasteRepository.find();
  }

  async findOne(id: number) {
    const waste = await this.wasteRepository.findOne({ where: { id } });

    if (!waste) {
      throw new NotFoundException('Waste not found');
    }
    return waste;
  }

  async update(id: number, updateWasteDto: UpdateWasteDto) {
    const waste = await this.findOne(id)
    Object.assign(waste, updateWasteDto);
    return this.wasteRepository.save(waste);
  }

  async remove(id: number) {
    const waste = await this.findOne(id)
    return this.wasteRepository.remove(waste);
  }

}
