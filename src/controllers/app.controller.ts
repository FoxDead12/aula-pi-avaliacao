import { Controller, Get } from '@nestjs/common';
import { DI } from 'src/DI';

@Controller('horarios')
export class AppController {
  constructor(private _DI: DI) {}

  @Get()
  async getHorarios() {
    const mainUrl = 'http://localhost/hor_exemplo/20220321/';
    const serviceUrl = this._DI.serviceFactory.IUrlsComunication;
    const urlsToAcess = await serviceUrl.getUrlsList(mainUrl);
    const separatedLinks = serviceUrl.separateUrls(mainUrl, urlsToAcess);
    //Agora tenho de buscar os dados da paginas e no fim guardar na base de dados
    // const setviceTurma = this._DI.serviceFactory.ITurmaService.getMany(separatedLinks.turma, mainUrl);
    
    const turmas = await this._DI.serviceFactory.ITurmaService.getMany(separatedLinks.turma, mainUrl);
    const docentes = await this._DI.serviceFactory.IDocenteService.getMany(separatedLinks.docentes, mainUrl);
   
    //Adicionar a base de dados os dados
  }
}    
