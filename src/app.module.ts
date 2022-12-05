import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmOptions } from '../typeorm.config';
import { DataSource } from 'typeorm';
import { DI } from './DI';
import { AppController } from './controllers/app.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmOptions),
  ],
  controllers: [AppController],
  providers: [DI],
})
export class AppModule {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
    private httpService: HttpService,
    private DI: DI,
  ) {
    DI.Build(httpService, dataSource);
  }
}
