import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DtoHorarioTurma } from "./DtoHorario";

@Entity("Turmas")
export class DtoTurma {

    @PrimaryGeneratedColumn()
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