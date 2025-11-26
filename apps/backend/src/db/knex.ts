import knexFactory, { Knex } from "knex";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Please define it in .env");
}

export const knex: Knex = knexFactory({
  client: "pg",
  connection: connectionString,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    extension: "ts",
    directory: "./src/db/migrations",
  },
  seeds: {
    directory: "./src/db/seeds",
  },
  debug: process.env.NODE_ENV !== "production",
});

// graceful shutdown (important for Docker containers)
process.on("SIGTERM", async () => {
  try {
    await knex.destroy();
    console.log("Knex connection closed.");
  } catch (err) {
    console.error("Error closing Knex connection:", err);
  } finally {
    process.exit(0);
  }
});

process.on("SIGINT", async () => {
  try {
    await knex.destroy();
    console.log("Knex connection closed.");
  } catch (err) {
    console.error("Error closing Knex connection:", err);
  } finally {
    process.exit(0);
  }
});
