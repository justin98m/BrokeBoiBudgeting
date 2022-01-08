var incomeAmount,fund,submit,availableCapitol,deleteButton
var addButton,deletefund,fundsContainer,deleteButtoncopy
incomeAmount = document.getElementById('incomeAmountBar')
availableCapitol = document.getElementById('availableCapitol')
addButton = document.getElementById('addFund')
submit = document.getElementById('submit')
fundsContainer = document.getElementById('fundsContainer')
deleteButtoncopy = document.createElement('span')
deleteButtoncopy.innerHTML = 'X'
deleteButtoncopy.classList.add('delete')
deleteButtoncopy.disabled = true;
deleteButton = document.getElementsByClassName('delete')
fund = document.getElementsByClassName('fund')

addFundListener(fund[0])
updateAvailableCapitol()

function addDeleteListener(thisDeleteButton){
  thisDeleteButton.addEventListener('click',()=>{deleteFund()})
}
function addFundListener(thisFund){
  thisFund.addEventListener('change',()=>{updateAvailableCapitol()})
}

addButton.addEventListener('click',()=>{
  addFund(fund)
})
//should take current val of income- all the funds income combined
//should turn red when Negative
//black when 0
function updateAvailableCapitol(){
  var i, sum=0
  for (var i = 0; i < fund.length; i++) {
    sum += parseInt(fund[i].children[1].value)
    console.log('fund:', i , ' capitol: ',fund[i].children[1].value)
  }
  console.log('FUnd Capitol: ', sum);
  tempIncome = parseInt(incomeAmount.value)
  difference = tempIncome-sum
  availableCapitol.innerHTML = '$'+ difference
  if(difference == 0)
    availableCapitol.style.color = 'black'
  else if(difference < 0)
    availableCapitol.style.color = 'Red'
  else
    availableCapitol.style.color = "#5b8f3c"

}

function deleteFund(){
  console.log('delete Fund');
}

incomeAmount.addEventListener("change",() =>{
  updateAvailableCapitol()
})
//adds a fund to the bottom of the fund container
function addFund(fund){
  console.log('Add Fund Running');
  var temp = null
  var tempDelete = 0
  var pos = fund.length
  temp = fund[pos-1].cloneNode(true)
  tempDelete= deleteButtoncopy.cloneNode(true)
  temp.appendChild(tempDelete)
  fundsContainer.appendChild(temp)
  //adds add button to the end after new fund input is added
  fundsContainer.appendChild(addButton)
  temp.children[1].name = "fund["+(pos)+"][fundCapitol]"
  temp.children[1].value = 0
  temp.children[3].name = "fund["+(pos)+"][fundName]"


  addDeleteListener(tempDelete)
  addFundListener(temp)
  fund = document.getElementsByClassName('fund')

}
//deletes fund local container
function deleteFund(fund){

}
