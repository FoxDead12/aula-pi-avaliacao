import { IDocenteService } from './IDocenteService';
import { ITurmaService } from './ITurmaService';
import { IUrlsComunication } from './IUrlsComunication';

export interface IFactoryService {
  IUrlsComunication: IUrlsComunication;
  ITurmaService: ITurmaService;
  IDocenteService: IDocenteService;
}
