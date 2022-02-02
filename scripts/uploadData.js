/*
  This script will upload data to sql table based on the called function's
  expected input
*/
const sqlString = require('sqlstring')
const start = require('./connect.js')
//Add income to db , retirieves this income's ID and sends it to fundIncome to
//to upload to its table
function income(input,fund,callback){
  console.log("\n\nRunning Income ");
  values = [input.name,input.date,input.capitol]
  let sql = sqlString.format("insert into INCOME (incomeName,incomeDate,capitol)"+
  "values(?,?,?)",values)
  start.runsql.query(sql,(err,result)=>{
    if(err){
      console.log('error:',err);
      callback(false)
    }
    else{
      console.log('Success : ',result);
      console.log(result.insertId);
      fundIncome(fund,result.insertId,callback)
    }
  })

}
//uses id passed from income and uploads fundIncome information in one conjoined
//sql statement
function fundIncome(fundIncome,incomeId,callback){
  console.log('\n\nrunning FUnd Income');
  let sql =""
  for (var i = 0; i < fundIncome.length; i++) {
    values = [fundIncome[i].capitol,incomeId,fundIncome[i].id]
    sql += sqlString.format("insert into FUND_INCOME (capitol,incomeId,fundId)"+
    " values(?,?,?);",values)
  }
    start.runsql.query(sql,(err,result)=>{
      if(err){
        console.log('Error: ', err)
        callback(false)
      }
      else{
        callback({incomeId : incomeId});
      }
    })
  }

function expense(input,callback){
  values = [input.expenseName,input.expenseCost,input.date,input.fundId]
  let sql = sqlString.format("insert into EXPENSE(expenseName,expenseCost,"+
  "expenseDate,fundId) values(?,?,?,?)",values)

  start.runsql.query(sql,(err,result)=>{
    if(err){
      console.log("error: ",err);
      callback(false)
    }
    else{
      callback(true)
    }
  })
}
function fund(input,callback){
  let values = [input.fundName,input.capitol,input.date]
  let sql = sqlString.format("insert into FUND(fundName,capitol,creationDate)"+
  "values(?,0,?)",values)
  start.runsql.query(sql,(err,result)=>{
    if(err){
      console.log("error: ",err)
      callback(false)
    }
    else{
      callback(true)
    }
  })
}
function adjustFundCapitol(fundId,amount,callback){
  amount = sqlString.format(amount)
  console.log("Amount after escape: ",amount);
  amount = parseInt(amount)
  console.log("Amount after parseInt: ",amount);
  sql = "Update FUND set capitol = capitol +"+amount+" where fundId="+fundId
  start.runsql.query(sql,(err,result)=>{
    if(err){
      console.log("Error:", err);
      callback(false)
    }
    else{
      callback(true)
    }
  })
}

module.exports = {
  income,
  fundIncome,
  expense,
  fund,
  adjustFundCapitol
}
