import { Controller, Get, Render } from '@nestjs/common';
import { ApyVisionService } from './apy-vision/apy-vision.service';

@Controller()
export class AppController {
  constructor(private apyVisionService: ApyVisionService) {}

  @Get()
  @Render('index')
  async root() {
    const pools = await this.apyVisionService.getApyPools();
    return { pools: pools };
  }
}
