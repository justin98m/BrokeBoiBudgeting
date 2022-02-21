/*
  This script will retirieve data from sql table based on the called function's
  expected input
*/
const sqlString = require('sqlstring')
const start = require('./connect.js')
const consolidate = require('./consolidateFundIds')
function income(callback){
  let sql = "select * from INCOME"
  start.runsql.query(sql,(err,income)=>{
    if(err){return false}
    else{
      callback(income)
      console.log(income);
    }
  })
}
function thisIncome(incomeId,callback){
  let sql ="select * from FUND_INCOME where incomeId ="+incomeId +";"
  sql += "select * from INCOME where incomeId ="+incomeId
  sqlString.format(sql)
  start.runsql.query(sql,(err,income)=>{
    if(err){callback(false)}
    else{
      var fundIncome = income[0]
      fundIds = consolidate.fundIds(fundIncome)
      fundNames(fundIds,income,callback)
    }
  })
}
function thisFund(fundId,income,callback){
  let sql = "select expenseName, expenseCost, expenseDate"
  sql+= " from EXPENSE where fundId= " + fundId + ";"
  sql += "select fundName, capitol,fundId from FUND where "
  sql += "fundId ="+fundId+ ";"
  //does this fund have a income statement?
  if(income != ""){
    sql += "select incomeName,incomeDate,incomeId from INCOME where incomeId ="
    sql += income[0].incomeId
    for (var i = 1; i < income.length; i++) {
      sql += " or incomeId =" + income[i].incomeId
    }
  }

  sqlString.format(sql)
  console.log("SQL Statement: ",sql);
  start.runsql.query(sql,(err,fund)=>{
    if(err){callback(false)}
    else{
        console.log("sql returning: ", fund);
        callback({expense:fund[0],details: fund[1],income:fund[2]})
    }
  })
}
function fundSelectBar(callback){
  let sql = "select fundName,fundId from FUND where fundId not in("
  sql += process.env.DELETEFUND + ")"
  start.runsql.query(sql,(err,funds)=>{
    if(err){
      callback(false)
    }
    else{
      callback(funds)
    }
  })
}
function funds(callback){
  let sql = "select * from FUND where fundId not in("+process.env.DELETEFUND+")"
  start.runsql.query(sql,(err,funds)=>{
    if(err){
      callback(false)
    }
    else{
      callback(funds)
    }
  })
}
//category can represent income or expense as
//a income or expense function may call fundNAmes
function fundNames(fundId,category,callback){
  let sql = "select fundName,fundId from FUND where fundId="+fundId[0]
  for (var i = 1; i < fundId.length; i++) {
    sql += " or fundid="+fundId[i]
  }
  console.log(sql);
  start.runsql.query(sql,(err,fundKey)=>{
    if(err){
      console.log("error: ",err);
      callback(false)
    }
    else{
      callback({fundKey: fundKey,category :category})
    }
  })
}
function expenses(callback){
  let sql = "select * from EXPENSE"
  start.runsql.query(sql,(err,expense)=>{
    if(err){
      console.log('error: ',err)
      callback(false)
    }
    else{
      var fundIds = consolidate.fundIds(expense)
      fundNames(fundIds,expense,callback)

    }
  })
}
function thisExpense(expenseId,callback){
  let sql = sqlString.format('select fundId from EXPENSE where expenseId=?',expenseId)
  start.runsql.query(sql,(err,fundId)=>{
    if(err){
      console.log("Error: ", err);
      callback(false)
    }
    else{
      callback(fundId)
    }
  })
}
function fundIncomes(fundId,callback){
  let sql = sqlString.format('select incomeId,capitol from FUND_INCOME where fundId=?',fundId)
  start.runsql.query(sql,(err,income)=>{
    if(err){
      console.log("Error:",err);
    }
    else{
      callback(income)
    }
  })
}

module.exports = {
  expenses,
  fundNames,
  funds,
  fundSelectBar,
  thisFund,
  income,
  thisIncome,
  thisExpense,
  fundIncomes
}
