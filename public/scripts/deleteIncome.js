var deleteIncome = document.getElementById('delete')
var incomeId = deleteIncome.name
deleteIncome.addEventListener("click",(event)=>{
  let question = "Are You Sure You Want to Delete This Income?"
  question += "This will remove the income from its listed expenses"
  if(confirm(question)){
    window.location.href = "deleteIncome?id="+incomeId
  }

})
