//module will give access to db connection to other programs
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
var con = mysql.createConnection({
        //should be a hidden env var
        host: process.env.REMOTEMYSQLHOST,
        user: process.env.REMOTEMYSQLUSER,
        password: process.env.REMOTEMYSQLPASS,
        database: "2budget"
});

exports.con = con;
