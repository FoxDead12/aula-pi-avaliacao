import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DtoHorarioTurma } from "./DtoHorarioTurma";

@Entity("Turmas")
export class DtoTurma {

    @PrimaryColumn()
    id: number;

    @Column()
    curso: string;
    
    @Column()
    ano: string;
    
    @Column()
    nome: string;

    @OneToMany((type) => DtoHorarioTurma, (DtoHorarioTurma) => DtoHorarioTurma.turma)
    horarioTurma: DtoHorarioTurma[];
}