import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DtoHorarioDocente } from "./DtoHorarioDocente";

@Entity("Docentes")
export class DtoDocente {

    @PrimaryColumn()
    id: number;
   
    @Column()
    nome: string;

    @OneToMany((type) => DtoHorarioDocente, (DtoHorarioDocente) => DtoHorarioDocente.docente)
    horarioDocente: DtoHorarioDocente[];
}