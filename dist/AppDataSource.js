"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Contact_ts_1 = require("./db/Contact.ts");
const PostgresDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "contact",
    entities: [Contact_ts_1.Contact],
    synchronize: true,
    logging: false,
});
PostgresDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
exports.default = PostgresDataSource;
