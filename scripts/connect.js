//module will give access to db connection to other programs
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
var pool = mysql.createPool({
        //should be a hidden env var
        connectionLimit:5,
        host: process.env.REMOTEMYSQLHOST,
        user: process.env.REMOTEMYSQLUSER,
        password: process.env.REMOTEMYSQLPASS,
        database: process.env.DATABASE,
        multipleStatements: true
});


module.exports = pool;
