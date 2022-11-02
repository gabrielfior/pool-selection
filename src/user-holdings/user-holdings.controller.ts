import { UserHoldingsService } from './user-holdings.service';
import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { UserHoldingDTO } from './dtos';

@Controller('user-holdings')
export class UserHoldingsController {
  constructor(private readonly userHoldingsService: UserHoldingsService) {}

  @Get()
  getUsers() {
    return this.userHoldingsService.getUserHoldings();
  }

  @Get('/email/:email/leaderboard')
  @Render('leaderboard')
  async getLeaderboard(@Param() params) {
    const userHoldings = await this.userHoldingsService.buildLeaderboard(params.email);
    return {user_holdings: userHoldings};
  }

  @Post()
  async addUser(@Body() userHoldingDTO: UserHoldingDTO) {

    const addedUserHolding = await this.userHoldingsService.addUserHolding(userHoldingDTO);
    console.log('added user', addedUserHolding);
    return addedUserHolding;
  }
}
