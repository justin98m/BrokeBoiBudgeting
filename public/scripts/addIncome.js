//Having Issues with HTML NOt requiring any input values but the dateLabel
//and I dont know why

//Verfies that Capitol Left to Distribute = 0
//Alters the submit button to be disbabled if not
import {invalidDifferenceReason} from "./invalidIncomeDifferenceReason.js"
import {getAvailableCapitol} from "./prefill.js"


var submit = document.getElementById('submit');
submit.addEventListener('mouseover',(event)=>{
    //invalidDifferenceReason(getAvailableCapitol)
    submitSwitch()
  })
function submitSwitch(){
  //when a value changes recalculate the difference
  //if diff is not 0 disable the submitt
  //else enable it
  var difference = getAvailableCapitol()
  console.log("diff: ",difference);
  if(difference != 0){
    submit.disabled = true;
    invalidDifferenceReason(difference)
  }
  else {
    console.log("valid difference");
    document.getElementById("errorMessage").innerHTML = ""
    submit.disabled = false
  }
}

console.log("running");
