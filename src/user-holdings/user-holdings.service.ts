import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApyVisionService } from 'src/apy-vision/apy-vision.service';
import { Repository } from 'typeorm';
import { UserHoldingUSDDTO } from './dtos';
import { UserHolding } from './user-holding.entity';

@Injectable()
export class UserHoldingsService {
  constructor(
    @InjectRepository(UserHolding)
    private userHoldingsRepository: Repository<UserHolding>,
    private apyVisionService: ApyVisionService,
  ) {}

  async buildLeaderboard(email: string): Promise<UserHoldingUSDDTO[]> {
    const pools = await this.apyVisionService.getApyPools();

    const usersUSDHoldings = await this.userHoldingsRepository.find();
    const usdHoldingsDTOs: UserHoldingUSDDTO[] = [];
    for (const user of usersUSDHoldings) {
      const pool = this.findPoolByAddress(user.pool_address, pools);
      const holdingInUSD = pool.avg_lp_price * user.num_lp_tokens;
      const dto = new UserHoldingUSDDTO(user.email, holdingInUSD, user.email === email ? true : false);
      usdHoldingsDTOs.push(dto);
    }
    return usdHoldingsDTOs;
  }

  getUserHoldings(): Promise<UserHolding[]> {
    return this.userHoldingsRepository.find();
  }

  findPoolByAddress(poolAddress: string, pools: any[]): any {
    for (const pool of pools) {
      if (pool.pool_address == poolAddress) {
        return pool;
      }
    }
    return undefined;
  }

  async addUserHolding(userHoldingDTO): Promise<UserHolding> {
    const newUserHolding = new UserHolding();
    newUserHolding.email = userHoldingDTO.email;
    newUserHolding.pool_address = userHoldingDTO.pool_address;
    const pools = await this.apyVisionService.getApyPools();
    try {
      const avg_lp_price = this.findPoolByAddress(
        userHoldingDTO.pool_address,
        pools,
      ).avg_lp_price;
      newUserHolding.num_lp_tokens = 100000 / avg_lp_price;
      return this.userHoldingsRepository.save(newUserHolding);
    } catch (error) {
      console.log('cannot add user', error);
      throw error;
    }
  }
}
