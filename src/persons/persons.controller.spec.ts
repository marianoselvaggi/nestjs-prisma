import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from '../db/db.service';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

describe('PersonsController', () => {
  let controller: PersonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [PersonsService, DbService],
    }).compile();

    controller = module.get<PersonsController>(PersonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
