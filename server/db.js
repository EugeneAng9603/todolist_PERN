const Pool = require("pg").Pool;

const pool = new Pool({
user: "eugene.ang",
password: "myPassword123",
host: "localhost",
port: 5432,
database: "perntodo",
});

module.exports = pool;