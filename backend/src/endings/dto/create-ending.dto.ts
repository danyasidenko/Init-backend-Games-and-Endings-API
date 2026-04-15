import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateEndingDto {
  @IsString()
  @IsNotEmpty()
  gameId: string; // ID гри, до якої належить кінцівка

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isDiscovered: boolean;
}