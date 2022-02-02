const dotenv = require('dotenv')
dotenv.config()
const sqlString = require('sqlstring')
const start = require('./connect.js')
const upload = require('./uploadData.js')
const retrieve = require('./retrieveData.js')
function funds(fundId,callback){
  setFundDeleted(fundId,(deleted)=>{
    if(!deleted){
      callback(false)
    }
    else{
      var sql = sqlString.format("delete from FUND where fundId=?",fundId)
      start.runsql.query(sql,(err,result)=>{
        if(err){
          console.log("error Here: ", err);
          callback(false)
        }
        else{
          callback(true)
        }
      })
    }
  })

}
function income(incomeId,callback){
  retrieve.thisIncome(incomeId,(income)=>{
    if(!income){
      callback(false)
    }
    else{
      var error = false;
      var fundIncome = income.category[0]
        for(i=0;i<fundIncome.length;i++){
          if(!error){
            upload.adjustFundCapitol(fundIncome[i].fundId,-1*fundIncome[i].capitol,(success)=>{
              if(!success){
                error = true
              }
            })
          }
          else{break}
        }

      sql = "delete from FUND_INCOME where incomeId = "+incomeId+";"
      sql += "delete from INCOME where incomeId ="+incomeId+";"
      sqlString.format(sql)
      console.log("Sql: ",sql);
      //this will run without waiting on adjustFundCapitol
      start.runsql.query(sql,(err,result)=>{
        if(err){
          console.log("error", err);
          callback(false)
        }
        else{
          callback(true)
        }
      })
    }
  })

}
function setFundDeleted(fundId, callback){
  const deleteID = process.env.DELETEFUND
  var sql = 'update FUND_INCOME set fundId='+deleteID+' where fundId ='+fundId+ ';'
  sql += 'update EXPENSE set fundId='+deleteID+' where fundId='+fundId
  sql = sqlString.format(sql)
  start.runsql.query(sql,(err,result)=>{
    if(err){callback(false);console.log('error:',err);}
    else{callback (true)}
  })
}
function expense(expenseId,callback){
  sql = sqlString.format("delete from EXPENSE where expenseId = ?", expenseId)
  start.runsql.query(sql,(err,success)=>{
    if(err){
      console.log('error:',err);
      callback(false)
    }
    else{
      callback(success)
    }
  })
}
module.exports = {
  funds,
  income,
  expense
}
