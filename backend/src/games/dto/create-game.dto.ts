import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty({ message: 'Назва гри не може бути порожньою' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Жанр обовʼязковий' })
  genre: string;

  @IsInt()
  @Min(1, { message: 'Гра повинна мати хоча б 1 кінцівку' })
  totalEndings: number;
}