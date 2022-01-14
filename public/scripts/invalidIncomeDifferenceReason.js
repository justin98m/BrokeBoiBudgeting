export function invalidDifferenceReason(difference){
  var fund, totalFunds,income,errorMessage,i
  totalFunds = 0
  errorMessage = document.getElementById("errorMessage")
if(difference > 0){
    console.log("Add more money to your funds");
    errorMessage.innerHTML = "Add more money to your Funds or remove money from"+
    " Income to make the Big Green Number = $0"
  }
  else if(difference < 0){
    console.log("Take away money from your funds");
    errorMessage.innerHTML = "Remove money from your Funds or add money to"+
    " your Income so the Big Red Number = $0"
  }


}
