import { ITurmaService } from "./ITurmaService";
import { IUrlsComunication } from "./IUrlsComunication";

export interface IFactoryService {

    IUrlsComunication: IUrlsComunication;
    ITurmaService: ITurmaService;

}