import * as path from "path";
import * as pg from "pg";
import * as dotenv from "dotenv"
import { ConfigService } from "@nestjs/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Profile } from "../../modules/profiles/entities/profile.entity";
import { DataSourceOptions } from "typeorm";

const CONFIG_PATH: string = path.resolve(process.cwd(), '.env')
dotenv.config({ path: CONFIG_PATH })

export const databaseFactory = (configService: ConfigService): PostgresConnectionOptions => ({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Profile],
    synchronize: false
})

export const getConfig = () => {
    return {
        driver: pg,
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        migrations: [__dirname + '/../database/migrations/*.{ts,js}'],
        entities: [__dirname + '/../**/entity/*.{ts,js}'],
        synchronize: false
    } as DataSourceOptions
}