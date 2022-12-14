import { MigrationInterface, QueryRunner } from "typeorm";

export class init1669834302457 implements MigrationInterface {
    name = 'init1669834302457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Docentes\` (\`id\` int NOT NULL, \`nome\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Turmas\` (\`id\` int NOT NULL, \`curso\` varchar(255) NOT NULL, \`ano\` varchar(255) NOT NULL, \`nome\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`HorarioTurma\` (\`id\` int NOT NULL, \`diaSemana\` int NOT NULL, \`disciplina\` varchar(255) NOT NULL, \`sala\` varchar(255) NOT NULL, \`horaInicio\` varchar(255) NOT NULL, \`horaFim\` varchar(255) NOT NULL, \`turmaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Links\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`HorarioTurma\` ADD CONSTRAINT \`FK_333f0d5e6cc1cf1273b9f676180\` FOREIGN KEY (\`turmaId\`) REFERENCES \`Turmas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`HorarioTurma\` DROP FOREIGN KEY \`FK_333f0d5e6cc1cf1273b9f676180\``);
        await queryRunner.query(`DROP TABLE \`Links\``);
        await queryRunner.query(`DROP TABLE \`HorarioTurma\``);
        await queryRunner.query(`DROP TABLE \`Turmas\``);
        await queryRunner.query(`DROP TABLE \`Docentes\``);
    }

}
