import { Test, TestingModule } from '@nestjs/testing';
import { UserHoldingsService } from './user-holdings.service';

describe('UserHoldingsService', () => {
  let service: UserHoldingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHoldingsService],
    }).compile();

    service = module.get<UserHoldingsService>(UserHoldingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
