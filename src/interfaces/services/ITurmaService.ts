import { IHorario, ITurma } from '../types/ITurma';

export interface ITurmaService {
  getMany(listUrls: string[], mainUrl: string): Promise<ITurma[]>;
  getOne(link: string): Promise<ITurma>;
  getHorario(data: string): Partial<IHorario>;

  InsertAllTurmas(data: ITurma[]): Promise<void>;
  InsertAllHorarios(data: ITurma[]): Promise<void>;
}
