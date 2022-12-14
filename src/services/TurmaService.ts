import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { DtoHorarioTurma } from 'src/dtos/tables/DtoHorarioTurma';
import { DtoTurma } from 'src/dtos/tables/DtoTurma';
import { ITurmaService } from 'src/interfaces/services/ITurmaService';
import { IHorario, ITurma } from 'src/interfaces/types/ITurma';
import { Repository } from 'typeorm';

export class TurmaService implements ITurmaService {
  constructor(
    private _httpService: HttpService,
    @InjectRepository(DtoTurma)
    private turmaRepository: Repository<DtoTurma>,
    @InjectRepository(DtoHorarioTurma)
    private horarioTurmaRepository: Repository<DtoHorarioTurma>,
  ) {}


  async InsertAllHorarios(data: ITurma[]): Promise<void> {
   
    const dtos: DtoHorarioTurma[] = [];
    let id = 0;
    data.forEach(turma => {
      const currentTurma: DtoTurma = {
        ano: turma.ano,
        curso: turma.curso,
        horarioTurma: null,
        id: turma.id,
        nome: turma.nome
      }

      turma.horario.segunda.forEach(aula => {

        const dto: DtoHorarioTurma = {
          diaSemana: 1,
          disciplina: aula.disciplinaNome,
          horaFim: aula.horaFim.toTimeString(),
          horaInicio: aula.horaInicio.toTimeString(),
          id: id,
          sala: aula.sala || '',
          turma: currentTurma
        }

        dtos.push(dto);
        id++;
      })

      turma.horario.terca.forEach(aula => {

        const dto: DtoHorarioTurma = {
          diaSemana: 2,
          disciplina: aula.disciplinaNome,
          horaFim: aula.horaFim.toTimeString(),
          horaInicio: aula.horaInicio.toTimeString(),
          id: id,
          sala: aula.sala || '',
          turma: currentTurma
        }

        dtos.push(dto);
        id++;
      })

      turma.horario.quarta.forEach(aula => {

        const dto: DtoHorarioTurma = {
          diaSemana: 3,
          disciplina: aula.disciplinaNome,
          horaFim: aula.horaFim.toTimeString(),
          horaInicio: aula.horaInicio.toTimeString(),
          id: id,
          sala: aula.sala || '',
          turma: currentTurma
        }

        dtos.push(dto);
        id++;
      })

      turma.horario.quinta.forEach(aula => {

        const dto: DtoHorarioTurma = {
          diaSemana: 4,
          disciplina: aula.disciplinaNome,
          horaFim: aula.horaFim.toTimeString(),
          horaInicio: aula.horaInicio.toTimeString(),
          id: id,
          sala: aula.sala || '',
          turma: currentTurma
        }

        dtos.push(dto);
        id++;
      })

      turma.horario.segunda.forEach(aula => {

        const dto: DtoHorarioTurma = {
          diaSemana: 5,
          disciplina: aula.disciplinaNome,
          horaFim: aula.horaFim.toTimeString(),
          horaInicio: aula.horaInicio.toTimeString(),
          id: id,
          sala: aula.sala || '',
          turma: currentTurma
        }

        dtos.push(dto);
        id++;
      })

      turma.horario.sabado.forEach(aula => {

        const dto: DtoHorarioTurma = {
          diaSemana: 6,
          disciplina: aula.disciplinaNome,
          horaFim: aula.horaFim.toTimeString(),
          horaInicio: aula.horaInicio.toTimeString(),
          id: id,
          sala: aula.sala || '',
          turma: currentTurma
        }

        dtos.push(dto);
        id++;
      })
      
    })

    await this.horarioTurmaRepository.save(dtos);
  }

  async InsertAllTurmas(data: ITurma[]): Promise<void> {
    
    const dtos: DtoTurma[] = [];
    data.forEach(turma => {
      const dto: DtoTurma = {
        ano: turma.ano,
        curso: turma.curso,
        horarioTurma: null,
        id: turma.id,
        nome: turma.nome
      }

      dtos.push(dto);
    })

    await this.turmaRepository.save(dtos);
  }
  

  async getMany(listUrls: string[], mainUrl: string): Promise<ITurma[]> {
    let errosLinks = [];
    const turmas: ITurma[] = [];
    
    let id = 0;
    for(const link of listUrls) {
      try {
        const result = await this.getOne(mainUrl + link);
        result.id = id;
        turmas.push(result);
        
      } catch (e) {
        errosLinks.push(link);
      }
      id++;
    }

    return turmas;
  }

  async getOne(link: string): Promise<ITurma> {

    let getDataSucess = false;
    let numbTimes = 0;
    let turma: ITurma = undefined;

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

        const nomeTurma = usefolData[0].toString().split(' ')[3]; //Buscar Nome
        const curso = usefolData[1].toString().split('-')[0]; //Buscar Curso
        const ano = usefolData[1].toString().split('-')[1].split(':')[1]; //Buscar Ano
      
        //usefolData[13] - E a partir daqui que vamos buscar o horario
        //usefolData[usefolData.length - 2]
        const horario = this.getHorario(data);

        turma = {
          id: null,
          ano,
          curso,
          nome: nomeTurma,
          horario: horario

        }

        getDataSucess = true;

      } catch (erro: any) {
        console.log('Some Error: ', erro);
      }
      numbTimes++;
    }

    return turma
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


    //Aqui j?? possuimos todas as linhas separadas em um array de 2 dimens??es
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
                   
          // console.log(colData)
          const minutosAula = (Number(col.split('"')[5])-1 ) * 30;         
          
          const numerosHora = horaInicio.split("");
          const data1 = new Date(2019, 5, 11, Number(numerosHora[0] + numerosHora[1]) + 1, Number(numerosHora[3] + numerosHora[4]), 0);
          const data2 = new Date(2019, 5, 11, Number(numerosHora[8] + numerosHora[9]) + 1, Number(numerosHora[11] + numerosHora[12]), 0); 
          const dataFim = data2.setMinutes(minutosAula);
                 
          const turmaDataArray = colData.replace('(', "").replace(")", '').split("[");
          const disciplina = turmaDataArray[0].replace("]", '');
          const professor = turmaDataArray[1].replace("]", '');
          const sala = turmaDataArray[2];

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
            //Caso entre ?? porque esxite vaga...
            // console.log("SEGUNDA - EXISTE AULA NESTE ESPA??O");
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
            //Caso entre ?? porque esxite vaga...
            // console.log("TER??A - EXISTE AULA NESTE ESPA??O")
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
            //Caso entre ?? porque esxite vaga...
            // console.log("QUARTA - EXISTE AULA NESTE ESPA??O")
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
            //Caso entre ?? porque esxite vaga...
            // console.log("QUINTA - EXISTE AULA NESTE ESPA??O")
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
            //Caso entre ?? porque esxite vaga...
            // console.log("SEXTA - EXISTE AULA NESTE ESPA??O")
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
            //Caso entre ?? porque esxite vaga...
            // console.log("SABADO - EXISTE AULA NESTE ESPA??O")
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
