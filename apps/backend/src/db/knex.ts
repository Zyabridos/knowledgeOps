import knex, { Knex } from "knex";

const config = require("../../knexfile.cjs") as Record<string, Knex.Config>;

const env = process.env.NODE_ENV || "development";
const knexConfig = config[env];

export const db = knex(knexConfig);
