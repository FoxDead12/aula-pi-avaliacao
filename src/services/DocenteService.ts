import { HttpService } from "@nestjs/axios";
import { IDocenteService } from "src/interfaces/services/IDocenteService";
import { IDocente } from "src/interfaces/types/IDocente";
import { IHorario } from "src/interfaces/types/ITurma";

export class DocenteService implements IDocenteService {
    constructor(private _httpService: HttpService) {}

    async getMany(listUrls: string[], mainUrl: string): Promise<IDocente[]> {
        let errosLinks = [];
        const docentes: IDocente[] = [];
        let id = 0;
        for(const link of listUrls) {
            try {
                const result = await this.getOne(mainUrl + link);
                result.id = id;
                docentes.push(result);
                
            } catch (e) {
                errosLinks.push(link);
            }
            id++;
        }

        return docentes;
    }

    async getOne(link: string): Promise<IDocente> {
        let getDataSucess = false;
        let numbTimes = 0;
        let docente: IDocente = undefined;

        while (getDataSucess == false && numbTimes < 4) {
        try {
            //Aqui vai o codigo quando corre tudo certo

            const { data } = await this._httpService.get(link).toPromise();

            var tempDataText = data.toString().replace(/<[^>]+>/g, '');
            tempDataText = tempDataText.replace(/\r\n/g, '\n').split('\n');
            var usefolData: string[] = [];
            tempDataText.forEach((element) => {
            
                if (element != '') {
                usefolData.push(element);
            }
            });



            const nome = usefolData[0].replace("Horário do docente ", ""); //Buscar Nome
            //usefolData[13] - E a partir daqui que vamos buscar o horario
            //usefolData[usefolData.length - 2]
            const horario = this.getHorario(data);

            docente = {
              id: null,
            nome: nome,
            horario: horario

            }

            getDataSucess = true;

        } catch (erro: any) {
            console.log('Some Error: ', erro);
        }
        numbTimes++;
        }

        return docente
    }

    getHorario(data: string): IHorario {

        const rs = data.toString().split("\n");
        //Vou Buscar todas as linhas que existem para assim conseguir trabalhar no codigo.  
    
        let tempData = new Array();
        
        let linha = 0;
        let coluna = 0;
        let readRow = false;
    
        let arrayRowTemp = new Array();
        rs.forEach((el) => {
    
          if(el.includes('<tr>')) {
            readRow = true;
          }
          else if(el.includes('</tr>')) {
            linha++;
            coluna = 0;
            if(readRow == true) {
              tempData.push(arrayRowTemp);
              arrayRowTemp = []
            }
            readRow = false;
          } 
          else if(readRow == true) {
    
            arrayRowTemp.push(el);
            coluna++;
          }
        })
    
    
        //Aqui já possuimos todas as linhas separadas em um array de 2 dimensões
        let horario: IHorario = {
          segunda: [] as null,
          terca: [] as null,
          quarta: [] as null,
          quinta: [] as null,
          sexta: [] as null,
          sabado: [] as null
        };
        let numRow = 0;
        tempData.forEach(row => {
    
          // console.log(row)
          let numCol = 0
          let horaInicio = "";
          
          row.forEach(col => {
    
            const colData = col.toString().replace(/<[^>]+>/g, '');
            if(numCol == 0 && numRow != 0) {
              horaInicio = colData;
            }
    
            if(colData != "&nbsp;" && numCol != 0 && numRow != 0) {
                       
              const minutosAula = (Number(col.split('"')[5])-1 ) * 30;         
              
              const numerosHora = horaInicio.split("");
              const data1 = new Date(2019, 5, 11, Number(numerosHora[0] + numerosHora[1]) + 1, Number(numerosHora[3] + numerosHora[4]), 0);
              const data2 = new Date(2019, 5, 11, Number(numerosHora[8] + numerosHora[9]) + 1, Number(numerosHora[11] + numerosHora[12]), 0); 
              const dataFim = data2.setMinutes(minutosAula);
                     
              const turmaDataArray = colData.replace('(', "").replace(")", '').split("[");
              const disciplina = turmaDataArray[0].replace("]", '');
              const professor = turmaDataArray[1].replace("]", '');
              const sala = turmaDataArray[2].replace("]", '');
    
              const indexDay = this.verDiaDaDisciplina(data1, new Date(dataFim), horario);
              switch(indexDay) {
                case 1: 
                  horario?.segunda?.push({sala: sala, disciplinaNome: disciplina, professor: professor, horaInicio: data1, horaFim: new Date(dataFim)})
                break;
                case 2: 
                  horario?.terca?.push({sala: sala, disciplinaNome: disciplina, professor: professor, horaInicio: data1, horaFim: new Date(dataFim)})
                break;
                case 3:
                  horario?.quarta?.push({sala: sala, disciplinaNome: disciplina, professor: professor, horaInicio: data1, horaFim: new Date(dataFim)}) 
                break;
                case 4: 
                  horario?.quinta?.push({sala: sala, disciplinaNome: disciplina, professor: professor, horaInicio: data1, horaFim: new Date(dataFim)})
                break;
                case 5: 
                  horario?.sexta?.push({sala: sala, disciplinaNome: disciplina, professor: professor, horaInicio: data1, horaFim: new Date(dataFim)})
    
                break;
                case 6: 
                  horario?.sabado?.push({sala: sala, disciplinaNome: disciplina, professor: professor, horaInicio: data1, horaFim: new Date(dataFim)})
                break;
              }
            }
    
            numCol++;
          })
    
          numRow++;
        })
    
       
        return horario;
    }
    
    verDiaDaDisciplina(horaFim: Date, horaInicio: Date, horario: IHorario): number {

    let indexReturn = 0;
    let find = false;

    if(find == false) {

        if(horario.segunda.length > 0) {

        horario.segunda?.forEach((el) => {
            
            if(horaInicio.getTime() > el.horaInicio.getTime() && horaFim.getTime() < el.horaFim.getTime()) {
            //Caso entre é porque esxite vaga...
            // console.log("SEGUNDA - EXISTE AULA NESTE ESPAÇO");
            indexReturn = 0;
            find = false;
            }
            else {

            indexReturn = 1;
            find = true;
            }
        });
        }
        else {

        indexReturn = 1;
        find = true;
        }
    }

    if(find == false) {

        if(horario.terca.length > 0) {

        horario.terca.forEach((el) => {
            
            if(horaInicio.getTime() > el.horaInicio.getTime() && horaFim.getTime() < el.horaFim.getTime()) {
            //Caso entre é porque esxite vaga...
            // console.log("TERÇA - EXISTE AULA NESTE ESPAÇO")
            indexReturn = 0;
            find = false;
            }
            else {

            indexReturn = 2;
            find = true;
            }
        });
        } else {

        indexReturn = 2;
        find = true;
        }
    }

    if(find == false) {

        if(horario.quarta.length > 0) {
        horario.quarta.forEach((el) => {
            
            if(horaInicio.getTime() > el.horaInicio.getTime() && horaFim.getTime() < el.horaFim.getTime()) {
            //Caso entre é porque esxite vaga...
            // console.log("QUARTA - EXISTE AULA NESTE ESPAÇO")
            indexReturn = 0;
            find = false;
            }
            else {

            indexReturn = 3;
            find = true;
            }
        });
        }
        else {
        indexReturn = 3;
            find = true;
        }
    }

    if(find == false) {
        if(horario.quinta.length > 0) {

        horario.quinta.forEach((el) => {
            
            if(horaInicio.getTime() > el.horaInicio.getTime() && horaFim.getTime() < el.horaFim.getTime()) {
            //Caso entre é porque esxite vaga...
            // console.log("QUINTA - EXISTE AULA NESTE ESPAÇO")
            indexReturn = 0;
            find = false;
            }
            else {

            indexReturn = 4;
            find = true;
            }
        });
        }
        else {

        indexReturn = 4;
        find = true;
        }
    }

    if(find == false) {

        if(horario.sexta.length > 0) {

        horario.sexta.forEach((el) => {
            
            if(horaInicio.getTime() > el.horaInicio.getTime() && horaFim.getTime() < el.horaFim.getTime()) {
            //Caso entre é porque esxite vaga...
            // console.log("SEXTA - EXISTE AULA NESTE ESPAÇO")
            indexReturn = 0;
            find = false;
            }
            else {

            indexReturn = 5;
            find = true;
            }
        });
        } 
        else {
        indexReturn = 5;
        find = true;
        }
    }

    if(find == false) {

        if(horario.sabado.length > 0) {

        horario.sabado.forEach((el) => {
            if(horaInicio.getTime() > el.horaInicio.getTime() && horaFim.getTime() < el.horaFim.getTime()) {
            //Caso entre é porque esxite vaga...
            // console.log("SABADO - EXISTE AULA NESTE ESPAÇO")
            indexReturn = 0;
            find = false;
            }
            else {

            indexReturn = 6;
            find = true;
            }
        });
        }
        else {
        indexReturn = 6;
        find = true;
        }

    }

    return indexReturn;
    }


}