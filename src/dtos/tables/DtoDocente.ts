import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Docentes")
export class DtoDocente {

    @PrimaryColumn()
    id: number;
   
    @Column()
    nome: string;
}