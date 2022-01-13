import {invalidDifferenceReason} from "./invalidIncomeDifferenceReason.js"

document.addEventListener('DOMContentLoaded',() =>{
  var submit = document.getElementById('btnSubmit')
  ValidateForm()
})
function positiveFundsOnly(){
  var fundDollars = document.getElementsByClassName('fundCapitol')
  for (var i = 0; i <fundDollars.length; i++) {
    console.log("This Much Money: ");

    }
}

function ValidateForm(){
  //console.log("Valid Difference is : ",validDifference())
}
