import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PersonEntity } from './entities/person.entity';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @ApiCreatedResponse({ type: PersonEntity })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  @ApiOkResponse({ type: PersonEntity })
  findAll() {
    return this.personsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PersonEntity })
  findOne(@Param('id') id: string) {
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PersonEntity })
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PersonEntity })
  remove(@Param('id') id: string) {
    return this.personsService.remove(+id);
  }
}
