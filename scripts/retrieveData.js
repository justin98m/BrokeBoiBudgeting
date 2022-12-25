/*
  This script will retirieve data from sql table based on the called function's
  expected input
*/
const sqlString = require('sqlstring');
const start = require('./connect.js');
const consolidate = require('./consolidateFundIds');


function income(){
  return new Promise (function(resolve,reject){
    let sql = "select * from INCOME"
    start.query(sql,(err,income)=>{
      if(err){
        reject({err});
      }
      resolve({income})
    });
  });
}
//Get the income details for a specific income 
function thisIncome(incomeId){
  return new Promise((resolve,reject) => {
    let sql ="select * from FUND_INCOME where incomeId ="+incomeId +";"
    sql += "select * from INCOME where incomeId ="+incomeId
    sqlString.format(sql)
    start.query(sql,(err,income)=>{
      if(err)
        reject({err:err});
      resolve({
          fundIncome : income[0],
          income : income[1][0]
        });
    })
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
//Given an array of ids , returns the correlating fund name
async function fundNames(fundIds){
  return new Promise((resolve,reject) => {
    let sql = "select fundName,fundId from FUND where fundId="+fundIds[0]
    for (var i = 1; i < fundIds.length; i++) {
      sql += " or fundid="+fundIds[i]
    }
    start.query(sql,(err,fund)=>{
      if(err)
        return reject({err:err});
      funds = fund.map((thisFund) => {
        return {fundName: thisFund.fundName, fundId: thisFund.fundId};
      })
      resolve(funds);
    })
  });
}

function expenses(callback){
  return new Promise((resolve,reject) =>{
      let sql = "select * from EXPENSE"
    start.query(sql,(err,expense)=>{
      if(err)
        reject({err:err})
      resolve(expense);
    })
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
