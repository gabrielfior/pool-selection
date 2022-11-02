import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHoldingsModule } from './user-holdings/user-holdings.module';
import { ConfigModule } from '@nestjs/config';
import { ApyVisionService } from './apy-vision/apy-vision.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      port: 3306,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // for development
      autoLoadEntities: true,
    }),
    UserHoldingsModule,
  ],
  controllers: [AppController],
  providers: [ApyVisionService],
})
export class AppModule {}
