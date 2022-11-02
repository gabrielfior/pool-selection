import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApyVisionService {
    constructor(private readonly httpService: HttpService) { }

    async getApyPools(): Promise<any[]> {

        const url = process.env.APY_VISION_URL;

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
