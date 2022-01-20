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
  let sql ="select * from FUND_INCOME where incomeId ="+ incomeId
  start.runsql.query(sql,(err,income)=>{
    if(err){callback(false)}
    else{
      console.log(income);
      fundIds = consolidate.fundIds(income)
      fundNames(fundIds,income,callback)
    }
  })
}
function thisFund(fundId,callback){
  let sql = "select expenseName, expenseCost, expenseDate"
  sql+= " from EXPENSE where fundId= " + fundId + ";"
  sql += "select fundName, capitol from FUND where "
  sql += "fundId ="+fundId
  start.runsql.query(sql,(err,fund)=>{
    if(err){callback(false)}
    else{
        callback({expense:fund[0],details: fund[1]})
        console.log(fund);
    }
  })
}
function fundSelectBar(callback){
  let sql = "select fundName,fundId from FUND"
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
  let sql = "select * from FUND"
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

module.exports = {
  expenses,
  fundNames,
  funds,
  fundSelectBar,
  thisFund,
  income,
  thisIncome
}
