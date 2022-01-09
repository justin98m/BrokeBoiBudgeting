function getFunds(start,callback){
  let query = "select fundName, fundId from FUND "
  start.runsql.query(query,(err,result)=>{
  	if(err){
  		console.error("error: ", err)
      callback(false)
    }
    else{callback(result)}
  	})
}
exports.getFunds = getFunds
