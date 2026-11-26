const { Pool } = require('pg');

const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    })
    : new Pool({
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'cloud_project',
        password: process.env.DB_PASSWORD || 'y64nes',
        port: parseInt(process.env.DB_PORT || '5000', 10)
    });

module.exports = pool;
