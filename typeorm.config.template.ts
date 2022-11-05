import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmOptions: TypeOrmModule = {

    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'pi-avaliacao',
    entities: ['./database/tables/**'],
    migrations: ["./database/migrations/**"],
    migrationsTableName: "migration_table",
    synchronize: false
}