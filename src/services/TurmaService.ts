import { HttpService } from '@nestjs/axios';
import { ITurmaService } from 'src/interfaces/services/ITurmaService';
import { ITurma } from 'src/interfaces/types/ITurma';

export class TurmaService implements ITurmaService {
  constructor(private _httpService: HttpService) {}

  getMany(listUrls: string[], mainUrl: string): Promise<ITurma[]> {
    let errosLinks = [];

    listUrls.forEach(async (link) => {
      try {
        const result = await this.getOne(mainUrl + link);
      } catch (e) {
        errosLinks.push(link);
      }
    });

    return;
  }

  async getOne(link: string): Promise<ITurma> {
    let getDataSucess = false;
    let numbTimes = 0;
    while (getDataSucess == false && numbTimes < 4) {
      try {
        //Aqui vai o codigo quando corre tudo certo

        const { data } = await this._httpService.get(link).toPromise();

        var tempDataText = data.toString().replace(/<[^>]+>/g, '');
        tempDataText = tempDataText.replace(/\r\n/g, '\n').split('\n');
        var usefolData: string[] = [];
        tempDataText.forEach((element) => {
          
            console.log(element)
            if (element != '') {
            usefolData.push(element);
          }
        });

        const nomeTurma = usefolData[0].toString().split(' ')[3];
        const curso = usefolData[1].toString().split('-')[0];
        const ano = usefolData[1].toString().split('-')[1].split(':')[1];

        //usefolData[13] - E a partir daqui que vamos buscar o horario
        //usefolData[usefolData.length - 2]
        let tempCount = 0;
        let horaInicio: string = '';
        let horaFim: string = '';
        for (let i = 13; i <= usefolData.length - 2; i++) {
          const row = usefolData[i];
          if (tempCount == 7) {
            tempCount = 0;
          }
          if (tempCount == 0) {
            const horas = row.split('-');
            horaInicio = horas[0];
            horaFim = horas[1];
          }

          //1 - Segunda
          //2 - Terça
          //3 - Quarta
          //4 - Quinta
          //5 - Sexta
          //6 - Sabado

          switch (tempCount) {
            case 0: 
            break;
            case 1:
              if (row !== '&nbsp;') {
                const data = row.split('[');
              }
              break;
            case 2:
              break;
            case 3:
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              break;
            default:
              break;
          }

          tempCount++;

        }

        getDataSucess = true;

      } catch (erro: any) {
        console.log('Some Error: ', erro);
      }
      numbTimes++;
    }

    throw new Error('Method not implemented.');
  }
}
