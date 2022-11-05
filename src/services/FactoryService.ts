import { IFactoryService } from "src/interfaces/services/IFactoryService";
import { UrlsComunication } from "./UrlsComunication";
import { HttpService } from '@nestjs/axios';
import { IUrlsComunication } from "src/interfaces/services/IUrlsComunication";
import { ITurmaService } from "src/interfaces/services/ITurmaService";
import { TurmaService } from "./TurmaService";

export class FactoryService implements IFactoryService {
    
    constructor(
        private _httpService: HttpService
    ){}
    
    get ITurmaService(): ITurmaService {

        return new TurmaService();
    }

    get IUrlsComunication(): IUrlsComunication {

        return new UrlsComunication(this._httpService);
    }

}