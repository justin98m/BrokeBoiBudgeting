const dotenv = require('dotenv');
dotenv.config();
const con = require('./connect.js');
//run sql statement for pages
var runsql = function(sql,callback){
        con.con.query(sql, function(err,result){
        //flag is returned with the callback to signify if an error was return or not
        	if (err)
            callback(err,true)
        	else
            callback (result, false)
	})
}


exports.runsql = runsql;
