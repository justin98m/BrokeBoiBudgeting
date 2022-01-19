/*
  This script will upload data to sql table based on the called function's
  expected input
*/
const sqlString = require('sqlstring')
const start = require('./connect.js')
//Add income to db , retirieves this income's ID and sends it to fundIncome to
//to upload to its table
function income(income,fund){
  console.log("\n\nRunning Income ",income);
  let sql = "insert into INCOME (incomeName,incomeDate,capitol) values('"+
  income.name+"','"+income.date+"','"+income.capitol+"')"
  start.runsql.query(sql,(err,result)=>{
    if(err){
      console.log('error:',err);
    }
    else{
      console.log('Success : ',result);
      console.log(result.insertId);
      fundIncome(fund,result.insertId)
    }
  })

}
//uses id passed from income and uploads fundIncome information in one conjoined
//sql statement
function fundIncome(fundIncome,incomeId){
  console.log('\n\nrunning FUnd INCome',fundIncome);
  let sql =""
  for (var i = 0; i < fundIncome.length; i++) {
    sql += "insert into FUND_INCOME (capitol,incomeId,fundId) values('"+
    fundIncome[i].capitol+"','"+incomeId+"','"+fundIncome[i].id+"');"
}
    start.runsql.query(sql,(err,result)=>{
      if(err){
        console.log('Error: ', err);
      }
      else{
        console.log("Success ");
      }
    })

function expense(){}
function fund(){}

}
module.exports = {income,fundIncome}
