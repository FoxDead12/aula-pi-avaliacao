import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DtoTurma } from "./DtoTurma";

@Entity("HorarioTurma")
export class DtoHorarioTurma {

    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    diaSemana: number;

    @Column()
    disciplina: string;

    @Column()
    sala:number;

    @Column()
    horaInicio: string;

    @Column()
    horaFim: string;

    @ManyToOne((type) => DtoTurma, (DtoTurma) => DtoTurma.horarioTurma)
    turma: DtoTurma;
}