import { ITurma } from "../types/ITurma";

export interface ITurmaService {

    getMany(listUrls: string[], mainUrl: string): Promise<ITurma[]>;
    getOne(link: string): Promise<ITurma>;
}