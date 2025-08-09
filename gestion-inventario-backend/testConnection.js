require('dotenv').config();
const { poolPromise } = require('./src/config/db');

async function testDBConnection() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT 1 AS conexionExitosa');
    console.log('¡Conexión exitosa!', result.recordset);
  } catch (error) {
    console.error('Error probando conexión:', error);
  } finally {
    process.exit();
  }
}

testDBConnection();
