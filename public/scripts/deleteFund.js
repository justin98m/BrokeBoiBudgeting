var deleteFund = document.getElementById('delete')
var fundId = deleteFund.name
deleteFund.addEventListener("click",(event)=>{
  let question = "Are You Sure You Want to Delete This fund?"
  question += "This will only delete the Fund , not its expenses or income Statements"
  if(confirm(question)){
    window.location.href = "deleteFund?id="+fundId
  }

})
