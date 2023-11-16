import ExampleController from "./Example";
import PostgresDataSource from "../db/connection";

const exampleController = new ExampleController(PostgresDataSource);

export { exampleController };
