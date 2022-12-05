import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { DtoDocente } from "./DtoDocente";
import { DtoTurma } from "./DtoTurma";

@Entity("HorarioDocente")
export class DtoHorarioDocente {

    @PrimaryColumn()
    id: number;
   
    @Column()
    diaSemana: number;

    @Column()
    disciplina: string;

    @Column()
    sala: string;

    @Column()
    horaInicio: string;

    @Column()
    horaFim: string;

    @ManyToOne((type) => DtoDocente, (DtoDocente) => DtoDocente.horarioDocente)
    docente: DtoDocente;
}