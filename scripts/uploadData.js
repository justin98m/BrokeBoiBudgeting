const start = require('./connect.js')

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
function fundIncome(fundIncome,incomeId){
  console.log('\n\nrunning FUnd INCome',fundIncome);
  for (var i = 0; i < fundIncome.length; i++) {
    let sql = "insert into FUND_INCOME (capitol,incomeId,fundId) values('"+
    fundIncome[i].capitol+"','"+incomeId+"','"+fundIncome[i].id+"')"
    start.runsql.query(sql,(err,result)=>{
      if(err){
        console.log('Error: ', err);
          console.log(fund);
      }
      else{
        console.log("Success ");
      }
    })
  }

}
module.exports = {income,fundIncome}
