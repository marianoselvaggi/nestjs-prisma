import { ApiProperty } from '@nestjs/swagger';

export class PageInfoEntity {
  @ApiProperty()
  hasNextPage: boolean;
  @ApiProperty()
  hasPreviouspage: boolean;
  @ApiProperty()
  startCursor: string;
  @ApiProperty()
  endCursos: string;
}
