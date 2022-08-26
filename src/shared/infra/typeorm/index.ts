import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin123",
  database: "rentx-api",
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});

export function createConnection(
  host = "database_ignite"
): Promise<DataSource> {
  return AppDataSource.setOptions({
    database: process.env.NODE_ENV === "test" ? "rentx-test" : "rentx-api",
    host,
  }).initialize();
}
