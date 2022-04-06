import { ApiProperty } from '@nestjs/swagger';
import { Person } from '@prisma/client';

export class PersonEntity implements Person {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;
}
