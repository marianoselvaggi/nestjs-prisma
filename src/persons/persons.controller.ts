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
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PersonEntity } from './entities/person.entity';
import { AuthGuard } from '@nestjs/passport';
import { ConnectionArgsDTO } from '../page/connection-args-dto';
import { PageEntity } from 'src/page/page.entity';

@ApiTags('persons')
@Controller('persons')
@ApiExtraModels(PageEntity)
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
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PageEntity) },
        {
          properties: {
            edge: {
              type: 'array',
              items: {
                type: 'object',
                required: ['cursor', 'node'],
                properties: {
                  cursor: { type: 'string' },
                  node: { type: 'object', $ref: getSchemaPath(PersonEntity) },
                },
              },
            },
          },
        },
      ],
    },
  })
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
