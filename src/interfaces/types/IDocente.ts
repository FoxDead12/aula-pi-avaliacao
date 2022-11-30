import { IHorario } from "./ITurma";

export interface IDocente {
  id: number;
  nome: string;
  horario: IHorario;

}
