const Pool = require('pg').Pool;
const fs = require('fs');

const pool = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'moviesdb'
});

module.exports = pool