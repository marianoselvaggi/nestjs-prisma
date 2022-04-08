import { PageInfoEntity } from './page-info.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PageEntity {
  @ApiProperty()
  pageInfo: PageInfoEntity;

  @ApiProperty()
  totalCount: number;
}
