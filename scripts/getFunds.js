function getFunds(start,callback){
  let query = "select fundName, fundId from FUND "
  start.runsql(query,(result,flag)=>{
  	if(flag){
  		console.error("error: ", result)
      callback(false)
    }
    else{callback(result)}
  	})
}
exports.getFunds = getFunds
