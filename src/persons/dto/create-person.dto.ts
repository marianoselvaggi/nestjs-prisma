import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class CreateEmailDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@ApiExtraModels(CreateEmailDTO)
export class CreatePersonDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ required: false })
  @IsOptional()
  emails?: CreateEmailDTO[];
}
