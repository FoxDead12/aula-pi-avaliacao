import { Injectable } from '@nestjs/common';
import { IFactoryService } from './interfaces/services/IFactoryService';
import { FactoryService } from './services/FactoryService';
import { HttpService } from '@nestjs/axios';

Injectable();
export class DI {
  public serviceFactory: IFactoryService;

  Build(httpService: HttpService) {
    //Aqui é onde vai criar o nosso SERVICE FACTORY
    this.serviceFactory = new FactoryService(httpService);
  }
}
