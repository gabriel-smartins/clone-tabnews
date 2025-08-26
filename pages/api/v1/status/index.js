import database from "infra/database.js";

const status = async (request, response) => {
  const updatedAt = new Date().toISOString();

  const postgresVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = postgresVersion.rows[0].server_version;

  const databaseMaxCons = await database.query("SHOW max_connections;");
  const databaseMaxConsValue = databaseMaxCons.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedCons = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const databaseOpenedConsValue = databaseOpenedCons.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConsValue),
        opened_connections: databaseOpenedConsValue,
      },
    },
  });
};

export default status;
