import { IFactoryService } from 'src/interfaces/services/IFactoryService';
import { UrlsComunication } from './UrlsComunication';
import { HttpService } from '@nestjs/axios';
import { IUrlsComunication } from 'src/interfaces/services/IUrlsComunication';
import { ITurmaService } from 'src/interfaces/services/ITurmaService';
import { TurmaService } from './TurmaService';
import { IDocenteService } from 'src/interfaces/services/IDocenteService';
import { DocenteService } from './DocenteService';
import { DataSource } from 'typeorm';
import { DtoTurma } from 'src/dtos/tables/DtoTurma';

export class FactoryService implements IFactoryService {
  constructor(
    private _httpService: HttpService,
    private _dataSource: DataSource
  ) {}
  
  get IDocenteService(): IDocenteService {
    return new DocenteService(this._httpService);
  }

  get ITurmaService(): ITurmaService {
    return new TurmaService(this._httpService, this._dataSource.getRepository(DtoTurma));
  }

  get IUrlsComunication(): IUrlsComunication {
    return new UrlsComunication(this._httpService);
  }
}
