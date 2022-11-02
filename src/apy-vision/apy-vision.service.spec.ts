import { Test, TestingModule } from '@nestjs/testing';
import { ApyVisionService } from './apy-vision.service';

describe('ApyVisionService', () => {
  let service: ApyVisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApyVisionService],
    }).compile();

    service = module.get<ApyVisionService>(ApyVisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
