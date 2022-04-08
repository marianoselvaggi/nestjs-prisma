import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PersonEntity } from './entities/person.entity';
import { AuthGuard } from '@nestjs/passport';
import { ConnectionArgsDTO } from '../page/connection-args-dto';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @ApiCreatedResponse({ type: PersonEntity })
  async create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  @ApiOkResponse({ type: PersonEntity })
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.personsService.findAll();
  }

  @Get('/page')
  async findAllPage(@Query() connectionArgs: ConnectionArgsDTO) {
    return this.personsService.findAllPage(connectionArgs);
  }

  @Get(':id')
  @ApiOkResponse({ type: PersonEntity })
  async findOne(@Param('id') id: string) {
    return this.personsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PersonEntity })
  async aupdate(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ) {
    return this.personsService.update(id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PersonEntity })
  async remove(@Param('id') id: string) {
    return this.personsService.remove(id);
  }
}
