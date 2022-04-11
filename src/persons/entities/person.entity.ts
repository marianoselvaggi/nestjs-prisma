import { ApiProperty } from '@nestjs/swagger';
import { Person } from '@prisma/client';

export class PersonEntity implements Person {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  emails: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updadeAt: Date;
}
