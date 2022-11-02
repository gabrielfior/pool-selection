import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApyVisionService } from 'src/apy-vision/apy-vision.service';
import { UserHolding } from './user-holding.entity';
import { UserHoldingsController } from './user-holdings.controller';
import { UserHoldingsService } from './user-holdings.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserHolding]), HttpModule],
  controllers: [UserHoldingsController],
  providers: [UserHoldingsService, ApyVisionService]
})
export class UserHoldingsModule {}
