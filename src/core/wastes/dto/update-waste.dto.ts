import { PartialType } from '@nestjs/mapped-types';
import { CreateWasteDto } from './create-waste.dto';

export class UpdateWasteDto extends PartialType(CreateWasteDto) {}
