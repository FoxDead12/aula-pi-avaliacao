import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Docentes")
export class DtoDocente {

    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    nome: string;
}