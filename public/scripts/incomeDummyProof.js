//adding constraints
//https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation
document.addEventListener('DOMContentLoaded',() =>{
  var submit = document.getElementById('btnSubmit')
  console.log('running: ', submit);
  submit.addEventListener('click',(event)=>{
    console.log('you clicked submit');
    ValidateForm()
  })

})
function ValidateForm(){
  var validForm = false
  var checks = []
  for(i=0;i<checks.length;checks++){
      if(checks[i] == false){
        validForm = false
        break
      }
      else{
        validForm = true
      }
    if(validForm){
      //submit
    }
    else {
      //display first issue found
    }

  }
}
function validDifference(){
  var fund, totalFunds,income,difference,errorMessage
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
    ValidateForm()
    //document.getElementById("form").submit()
  }
  else if(difference > 0){
    console.log("Add more money to your funds");
    errorMessage.innerHTML = "Add more money to your Funds or remove money from"+
    " Income to make the Big Green Number $0"
  }
  else {
    console.log("Take away money from your funds");
    errorMessage.innerHTML = "Remove money from your Funds or add money to"+
    " your Income so the Big Red Number $0"
  }


}
