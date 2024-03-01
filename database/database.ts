import * as sql from 'mssql';

const sqlConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_HOST as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const pool = new sql.ConnectionPool(sqlConfig);
// Only connect if a database was provided
const poolConnect = process.env.DB_HOST ? pool.connect() : undefined;

// Matches the parameters of Request.input()
export type RequestInputParameter = {
  name: string;
  type: (() => sql.ISqlType) | sql.ISqlType;
  value: any;
};
export default {
  /**
   * Execute a SQL query on the database
   * @param queryStr - String value of a SQL query. May contain parameters in the form of '@parameter'.
   * @param params - (Optional) Array of RequestInputParameter types to pass into the query. The names should match those in the query string.
   */
  query: async function (queryStr: string, params: RequestInputParameter[] = []) {
    let results;
    await poolConnect;
    if (!poolConnect) {
      // If a query is attempted without a valid database connection, throw an error
      throw new sql.ConnectionError('No valid database information was provided');
    }

    try {
      const request = pool.request();
      // Apply any parameters to the query string
      for (const param of params) {
        request.input(param.name, param.type, param.value);
      }
      results = await request.query(queryStr);
    } catch (err) {
      console.log(err);
    }
    return results;
  },
};
