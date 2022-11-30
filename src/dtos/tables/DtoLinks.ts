import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Links")
export class DtoLinks {

    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    url: string;
}