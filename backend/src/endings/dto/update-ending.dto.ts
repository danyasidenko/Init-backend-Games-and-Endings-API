import { PartialType } from '@nestjs/mapped-types';
import { CreateEndingDto } from './create-ending.dto';

export class UpdateEndingDto extends PartialType(CreateEndingDto) {}
