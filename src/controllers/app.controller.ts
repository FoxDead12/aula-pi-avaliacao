import { Controller, Get } from "@nestjs/common";
import { DI } from "src/DI";

@Controller("horarios")
export class AppController {

    constructor(private _DI: DI){}

    @Get() 
    async getHorarios() {


        //Vamos Buscar 
        const mainUrl = 'https://horarios.ispgaya.pt/geral/';
        const serviceUrl = this._DI.serviceFactory.IUrlsComunication;
        const urlsToAcess = await serviceUrl.getUrlsList(mainUrl);
        const separatedLinks = serviceUrl.separateUrls(mainUrl, urlsToAcess);

        //Agora tenho de buscar os dados da paginas e no fim guardar na base de dados
        // const setviceTurma = this._DI.serviceFactory.ITurmaService.getMany(separatedLinks.turma, mainUrl);


        const testResult = await this._DI.serviceFactory.ITurmaService.getOne('https://horarios.ispgaya.pt/geral/turma_EAI1_5.html?638031812535043582');
        console.log(testResult);
    }
}