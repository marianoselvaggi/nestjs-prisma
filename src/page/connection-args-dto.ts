import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConnectionArgsDTO {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  first?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  last: number;

  @IsOptional()
  @ApiProperty({ required: false })
  after: string;

  @IsOptional()
  @ApiProperty({ required: false })
  before: string;
}
