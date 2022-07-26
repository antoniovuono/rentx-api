import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_ignite",
  port: 5432,
  username: "admin",
  password: "admin123",
  database: "rentx-api",
});
