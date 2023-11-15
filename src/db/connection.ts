import { DataSource } from "typeorm";
import { Contact } from "./Contact";

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
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
