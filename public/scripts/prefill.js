import {validNumber} from "./inputDummyProof.js"
var incomeAmount,fund,submit,availableCapitol,deleteButton
var addButton,deletefund,fundsContainer

incomeAmount = document.getElementById('incomeAmountBar')
availableCapitol = document.getElementById('availableCapitol')
addButton = document.getElementById('addFund')
submit = document.getElementById('submit')
fundsContainer = document.getElementById('fundsContainer')
deleteButton = document.createElement('span')
deleteButton.innerHTML = 'X'
deleteButton.classList.add('delete')
fund = document.getElementsByClassName('fund')

addFundListener(fund[0])
updateAvailableCapitol()

function addDeleteListener(thisDeleteButton){
  thisDeleteButton.addEventListener('click',()=>{deleteFund(thisDeleteButton)})
}
//These Change listeners update Available capitol left to distribut value
//along with correcting invalid values to valid ones
incomeAmount.addEventListener("change",() =>{
  incomeAmount.value = validNumber(incomeAmount.value)
  updateAvailableCapitol()
})
function addFundListener(thisFund){
  thisFund.addEventListener('change',()=>{
    thisFund.children[1].value = validNumber(thisFund.children[1].value)
    updateAvailableCapitol()
    })
}

addButton.addEventListener('click',()=>{
  addFund(fund)
})
function getAvailableCapitol(){
  var i, sum=0,tempIncome,difference
  for (var i = 0; i < fund.length; i++) {
    sum += parseInt(fund[i].children[1].value)
    //console.log('fund:', i , ' capitol: ',fund[i].children[1].value)
  }
  //console.log('FUnd Capitol: ', sum);
  tempIncome = parseInt(incomeAmount.value)
  difference = tempIncome-sum
  return difference
}
//should take current val of income- all the funds income combined
//should turn red when Negative
//black when 0
function updateAvailableCapitol(){

  var difference = getAvailableCapitol()
  availableCapitol.innerHTML = '$'+ difference
  if(difference == 0)
    availableCapitol.style.color = 'black'
  else if(difference < 0)
    availableCapitol.style.color = 'Red'
  else
    availableCapitol.style.color = "#5b8f3c"

}

function deleteFund(deleteButton){
  deleteButton.parentNode.remove()
  //updates the fund variable to remove the deleted fund container
  fund = document.getElementsByClassName('fund')
  updateNameValues(fund)
  updateAvailableCapitol()
}
function updateNameValues(fund){
  var capitolBar,selectBar
  for (var i = 1; i < fund.length; i++) {
    capitolBar = fund[i].children[1]
    selectBar = fund[i].children[3]
    capitolBar.name = "fund["+i+"][capitol]"
    selectBar.name = "fund["+i+"][id]"
  }

}
//adds a fund to the bottom of the fund container
function addFund(fund){
  console.log('Add Fund Running');
  var pos = fund.length
  console.log('Fund lengeth',pos);
  var temp,tempDelete,capitolBar,selectBar
  temp = fund[0].cloneNode(true)
  tempDelete = deleteButton.cloneNode(true)
  temp.appendChild(tempDelete)
  fundsContainer.appendChild(temp)

  //adds add button to the bottom of funds container after new fund input is added
  fundsContainer.appendChild(addButton)
  //fund values are stored in array to be easily accessed after submission
  //updaateNameValues isnt called since iterations all values dont need to be updated
  capitolBar = temp.children[1]
  selectBar = temp.children[3]
  capitolBar.name = "fund["+pos+"][capitol]"
  capitolBar.value = 0
  selectBar.name = "fund["+pos+"][id]"

  //creates listeners for these individual nodes
  addDeleteListener(tempDelete)
  addFundListener(temp)
  //updates the fund variable to contain this newly created fund container
  fund = document.getElementsByClassName('fund')
}
export {getAvailableCapitol}
