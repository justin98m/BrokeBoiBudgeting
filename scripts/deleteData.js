const dotenv = require('dotenv')
dotenv.config()
const sqlString = require('sqlstring')
const start = require('./connect.js')
const upload = require('./uploadData.js')
const retrieve = require('./retrieveData.js')
function funds(fundId,callback){
  setFundDeleted(fundId,(err)=>{
    if(err)
      return callback(true)
    var sql = sqlString.format("delete from FUND where fundId=?",fundId)
    start.query(sql,(err,result)=>{
      if(err)
        return callback(err)
      return callback(null,true)
    })
  })
}
function income(incomeId,callback){
  retrieve.thisIncome(incomeId,(err,income)=>{
    if(err)
      return callback(err)
    var error = false;
    var fundIncome = income.category[0]
    //issue with this is if one error occurs theres no way of undoing what has
    //been done to funds that had their capitol altered
    for(i=0;i<fundIncome.length;i++){
      if(!error){
        upload.adjustFundCapitol(fundIncome[i].fundId,-1*fundIncome[i].capitol,(err)=>{
          if(err){
            return callback(true)
          }
        })
      }
      else{break}
    }
    sql = "delete from FUND_INCOME where incomeId = "+incomeId+";"
    sql += "delete from INCOME where incomeId ="+incomeId+";"
    sqlString.format(sql)
    //this will run without waiting on adjustFundCapitol
    start.query(sql,(err,result)=>{
      if(err)
        return callback(err)
      callback(null)
    })
  })

}
function setFundDeleted(fundId, callback){
  const deleteID = process.env.DELETEFUND
  var sql = 'update FUND_INCOME set fundId='+deleteID+' where fundId ='+fundId+ ';'
  sql += 'update EXPENSE set fundId='+deleteID+' where fundId='+fundId
  sql = sqlString.format(sql)
  start.query(sql,(err,result)=>{
    if(err)
      return callback(true)
    callback(null)
  })
}
function expense(expenseId,callback){
  sql = sqlString.format("delete from EXPENSE where expenseId = ?", expenseId)
  start.query(sql,(err,success)=>{
    if(err)
      return callback(true)
    callback(null)
  })
}
module.exports = {
  funds,
  income,
  expense
}
