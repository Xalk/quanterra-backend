import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageTankDto } from './create-storage-tank.dto';

export class UpdateStorageTankDto extends PartialType(CreateStorageTankDto) {}
