const { Pool } = require('pg');

const connectionString = 'https://localhost:5432/fitness-tracker';

const client = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;
