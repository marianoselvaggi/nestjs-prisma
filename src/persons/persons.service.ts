import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DbService } from '../db/db.service';
import { Person } from '@prisma/client';

@Injectable()
export class PersonsService {
  constructor(private readonly dbService: DbService) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    return await this.dbService.person.create({
      data: createPersonDto,
    });
  }

  async findAll(): Promise<Person[]> {
    return await this.dbService.person.findMany({
      include: {
        emails: true,
      },
    });
  }

  async findOne(id: number): Promise<Person> {
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

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const person = await this.dbService.person.findUnique({
      where: {
        id,
      },
    });
    if (!person) {
      throw new NotFoundException('The person does not exist');
    }
    return await this.dbService.person.update({
      where: {
        id,
      },
      data: updatePersonDto,
    });
  }

  async remove(id: number): Promise<Person> {
    const person = await this.dbService.person.findUnique({
      where: {
        id,
      },
    });
    if (!person) {
      throw new NotFoundException('The person does not exist');
    }
    return await this.dbService.person.delete({
      where: {
        id,
      },
    });
  }
}
