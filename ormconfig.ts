import * as path from 'path';
import * as dotenv from 'dotenv';

const CONFIG_PATH: string = path.resolve(process.cwd(), `.env`);

dotenv.config({ path: CONFIG_PATH });

const MIGRATIONS_PATH: string = path.resolve(
  process.cwd(),
  `src/shared/database/migrations`,
);

const SEEDS_PATH: string = path.resolve(
  process.cwd(),
  `src/shared/database/seeds`,
);

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: [`${MIGRATIONS_PATH}/*{.ts,.js}`],
  seeds: [`${SEEDS_PATH}/*{.ts,.js}`],
  cli: {
    migrationsDir: MIGRATIONS_PATH,
  },
  synchronize: false
};
