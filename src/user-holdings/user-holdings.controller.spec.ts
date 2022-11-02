import { Test, TestingModule } from '@nestjs/testing';
import { UserHoldingsController } from './user-holdings.controller';

describe('UserHoldingsController', () => {
  let controller: UserHoldingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHoldingsController],
    }).compile();

    controller = module.get<UserHoldingsController>(UserHoldingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
