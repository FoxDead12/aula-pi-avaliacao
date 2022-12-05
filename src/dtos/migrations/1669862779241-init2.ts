import { MigrationInterface, QueryRunner } from "typeorm";

export class init21669862779241 implements MigrationInterface {
    name = 'init21669862779241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`HorarioDocente\` (\`id\` int NOT NULL, \`diaSemana\` int NOT NULL, \`disciplina\` varchar(255) NOT NULL, \`sala\` varchar(255) NOT NULL, \`horaInicio\` varchar(255) NOT NULL, \`horaFim\` varchar(255) NOT NULL, \`docenteId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`HorarioDocente\` ADD CONSTRAINT \`FK_29fc9b74220a8dcfa8f90cad93b\` FOREIGN KEY (\`docenteId\`) REFERENCES \`Docentes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`HorarioDocente\` DROP FOREIGN KEY \`FK_29fc9b74220a8dcfa8f90cad93b\``);
        await queryRunner.query(`DROP TABLE \`HorarioDocente\``);
    }

}
