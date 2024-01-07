import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  author: string;
}

export class UpdateBookDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  author?: string;
}
