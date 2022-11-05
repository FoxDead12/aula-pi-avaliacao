import { HttpService } from '@nestjs/axios';
import { IUrlsComunication } from 'src/interfaces/services/IUrlsComunication';

export class UrlsComunication implements IUrlsComunication {
    
    constructor(
        private _httpService: HttpService
    ){}
    
    //Aqui vamos Buscar ao URL main todas as URL's para buscar os horarios
    async getUrlsList(url: string): Promise<string[]> {

        const {data} = await this._httpService.get(url).toPromise();
        var linkReg = /(<[Aa]\s(.*)<\/[Aa]>)/g; 
        var linksInText = data.toString().match(linkReg);


        let allUrlsToAccess: string[] = [];
        linksInText.forEach(element => {

            const splitTag = element.split('"');
            allUrlsToAccess.push(splitTag[1]);
        });


        // const array = data.toString().replace(/<[^>]+>/g, '');
        // console.log(array);
        
        return allUrlsToAccess;
    }

    //Aqui vamos entrar pagina a pagina e guardar todas os horarios um a um
    separateUrls(mainUrl: string, urlsList: string[]): {docentes: string[], turma: string[]} {

        let dados = {

            docentes: [],
            turma: []
        }
        //Vamos ter dois TIPOS DE HORARIOS PROF E TURMA
        urlsList.forEach((link: string) => {

            if(link.includes("turma")){
                //Turma
                dados.turma.push(link);
            }
            else {
                //Docente
                dados.docentes.push(link);
            }
        })


        return dados;
    }
}