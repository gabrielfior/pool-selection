import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApyVisionService } from './apy-vision/apy-vision.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private apyVisionService: ApyVisionService,
  ) {}

  @Get()
  @Render('index')
  async root() {
    const pools = await this.apyVisionService.getApyPools();
    return { pools: pools };
  }
}
