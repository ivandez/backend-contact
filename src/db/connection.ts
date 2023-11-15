import { DataSource } from "typeorm";
import { Contact } from "./Contact";
import "dotenv/config";

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT as unknown as number) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Contact],
  synchronize: true,
  logging: false,
});

PostgresDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization", err);
  });

export default PostgresDataSource;
