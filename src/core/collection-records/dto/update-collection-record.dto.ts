import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionRecordDto } from './create-collection-record.dto';

export class UpdateCollectionRecordDto extends PartialType(CreateCollectionRecordDto) {}
