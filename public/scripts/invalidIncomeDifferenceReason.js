import {getAvailableCapitol} from "./prefill.js"

export function invalidDifferenceReason(){
  var fund, totalFunds,income,difference,errorMessage,i
  totalFunds = 0
  errorMessage = document.getElementById("errorMessage")
  fund = document.getElementsByClassName('fund')
  income = parseInt(document.getElementById('incomeAmountBar').value)
  for(i=0;i<fund.length;i++){
    totalFunds += parseInt(fund[i].children[1].value)
  }
  console.log("Total In funds: ", totalFunds);
  console.log("Total Income: ", income);
  difference = income-totalFunds
  if(difference === 0){
    console.log("so am submitting");
    return true
    //document.getElementById("form").submit()
  }
  else if(difference > 0){
    console.log("Add more money to your funds");
    errorMessage.innerHTML = "Add more money to your Funds or remove money from"+
    " Income to make the Big Green Number $0"
    return false
  }
  else {
    console.log("Take away money from your funds");
    errorMessage.innerHTML = "Remove money from your Funds or add money to"+
    " your Income so the Big Red Number $0"
    return false
  }


}
