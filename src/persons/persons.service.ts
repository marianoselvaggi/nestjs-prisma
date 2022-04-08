import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto, CreateEmailDTO } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DbService } from '../db/db.service';
import { Person } from '@prisma/client';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ConnectionArgsDTO } from '../page/connection-args-dto';

@Injectable()
export class PersonsService {
  constructor(private readonly dbService: DbService) {}

  create(createPersonDto: CreatePersonDto): Promise<Person> {
    const data = {
      ...createPersonDto,
      emails: {
        create: createPersonDto.emails.map((email: CreateEmailDTO) => {
          return {
            email: email.email,
          };
        }),
      },
    };
    return this.dbService.person.create({
      data: data,
      include: {
        emails: true,
      },
    });
  }

  findAll(): Promise<Person[]> {
    return this.dbService.person.findMany({
      include: {
        emails: true,
      },
    });
  }

  async findAllPage(connectionArgs: ConnectionArgsDTO) {
    const result = await findManyCursorConnection(
      (args) => this.dbService.person.findMany(args),
      () => this.dbService.person.count(),
      connectionArgs,
    );
    return result;
  }

  async findOne(id: string): Promise<Person> {
    const person = await this.dbService.person.findUnique({
      where: {
        id,
      },
      include: {
        emails: true,
      },
    });
    if (!person) {
      throw new NotFoundException('The person does not exist');
    }
    return person;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.dbService.person.findUnique({
      where: {
        id,
      },
    });
    if (!person) {
      throw new NotFoundException('The person does not exist');
    }
    return this.dbService.person.update({
      where: {
        id,
      },
      data: updatePersonDto,
    });
  }

  async remove(id: string): Promise<Person> {
    const person = await this.dbService.person.findUnique({
      where: {
        id,
      },
    });
    if (!person) {
      throw new NotFoundException('The person does not exist');
    }
    return this.dbService.person.delete({
      where: {
        id,
      },
    });
  }
}
