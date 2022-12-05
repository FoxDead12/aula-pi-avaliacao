import { IDocente } from "../types/IDocente";
import { IHorario } from "../types/ITurma";

export interface IDocenteService {

    getMany(listUrls: string[], mainUrl: string): Promise<IDocente[]>;
    getOne(link: string): Promise<IDocente>;
    getHorario(data: string): Partial<IHorario>;

    InsertAllDocentes(data: IDocente[]): Promise<void>;
    InsertAllHorarios(data: IDocente[]): Promise<void>;
}