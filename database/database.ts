import { ConnectionPool } from 'mssql';

const sqlConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  server: process.env.DB_HOST as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 3000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const pool = new ConnectionPool(sqlConfig);

pool.on('connection', () => {
  console.log('Connection established');
});
pool.on('error', (err) => {
  console.log(err);
});

export default {
  query: async function (queryStr: string) {
    let results;
    const poolConnect = await pool.connect();

    try {
      const request = pool.request();
      results = await request.query(queryStr);
    } catch (err) {
      console.log(err);
    }
    return results;
  },
};
