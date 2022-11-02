import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApyVisionService {
    constructor(private readonly httpService: HttpService) { }

    async getApyPools(): Promise<any[]> {

        const url = 'https://stats.apy.vision/api/v1/pool_search/advanced_search?avg_period_daily_volume_usd=250000&avg_period_reserve_usd=1000000&min_pool_age_days=7&vr=0&exchanges=uniswap_eth&access_token=b55b52c3-3d81-47c5-8d47-91925ce6a6a9';

        const { data } = await firstValueFrom(
            this.httpService.get<any>(url).pipe(
                catchError((error) => {
                    console.error(error.response.data);
                    throw ('An error happened!');
                }),
            ),
      );
        return data.results;

    }
}
