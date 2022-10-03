/*
  This script will retirieve data from sql table based on the called function's
  expected input
*/
const sqlString = require('sqlstring')
const start = require('./connect.js')
const consolidate = require('./consolidateFundIds')
function income(callback){
  let sql = "select * from INCOME"
  start.query(sql,(err,income)=>{
    if(err)
      return callback(err)
    callback(null,income)
  })
}
function thisIncome(incomeId,callback){
  let sql ="select * from FUND_INCOME where incomeId ="+incomeId +";"
  sql += "select * from INCOME where incomeId ="+incomeId
  sqlString.format(sql)
  start.query(sql,(err,income)=>{
    if(err)
      return callback(err)
    var fundIncome = income[0]
    fundIds = consolidate.fundIds(fundIncome)
    fundNames(fundIds,income,callback)
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
  start.query(sql,(err,fund)=>{
    if(err)
      return callback(err)
    callback(null,{expense:fund[0],details: fund[1],income:fund[2]})

  })
}
function fundSelectBar(callback){
    let sql = "select fundName,fundId from FUND"
    start.query(sql,(err,result)=>{
      if(err)
        return callback(err)
      callback(null,result)
    })

}
function funds(callback){
  let sql = "select * from FUND";
  start.query(sql,(err,result)=>{
    if(err)
      return callback(err)
    callback(null,result)
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
  start.query(sql,(err,fundKey)=>{
    if(err)
      return callback(err)
    callback(null,{fundKey: fundKey,category :category})
  })
}
function expenses(callback){
  let sql = "select * from EXPENSE"
  start.query(sql,(err,expense)=>{
    if(err)
      return callback(err)
    var fundIds = consolidate.fundIds(expense)
    fundNames(fundIds,expense,callback)
  })
}
function thisExpense(expenseId,callback){
  let sql = sqlString.format('select fundId from EXPENSE where expenseId=?',expenseId)
  start.query(sql,(err,fundId)=>{
    if(err)
      return callback(err)
    callback(null,fundId)
  })
}
function fundIncomes(fundId,callback){
  let sql = sqlString.format('select incomeId,capitol from FUND_INCOME where fundId=?',fundId)
  start.query(sql,(err,income)=>{
    if(err)
      return callback(err)
    callback(null,income)
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
