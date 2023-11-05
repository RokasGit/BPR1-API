import config from "../../config";
import knex from "knex";

const {
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB,
    MYSQL_HOST,
} = config.env;


export const db = knex({
    client: "mysql2",
    connection: {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DB,
    },
    pool: {
        min: 0,
        max: 10,
    },
});

