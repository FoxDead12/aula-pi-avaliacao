import { Injectable } from '@nestjs/common';
import { IFactoryService } from './interfaces/services/IFactoryService';
import { FactoryService } from './services/FactoryService';
import { HttpService } from '@nestjs/axios';
import { DataSource } from 'typeorm';

Injectable();
export class DI {
  public serviceFactory: IFactoryService;

  Build(httpService: HttpService, dataSource: DataSource) {
    //Aqui é onde vai criar o nosso SERVICE FACTORY
    this.serviceFactory = new FactoryService(httpService, dataSource);
  }
}
