import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { DtoTurma } from "./DtoTurma";

@Entity("HorarioTurma")
export class DtoHorarioTurma {

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

    @ManyToOne((type) => DtoTurma, (DtoTurma) => DtoTurma.horarioTurma)
    turma: DtoTurma;
}