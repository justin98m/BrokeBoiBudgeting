//What Im trying to do {
  //disable the submit button if the difference is 0
  //which means everytime any number val is changed we are checking what the diff is
  //when the difference is valid remove the message and enable the submit button
  //also want to put specific test for a generic dummy proof for all forms
    //where the a file specific dummy proofer can can send a dollar value to the generic
    //generic would then validate/invalidate the number
} while (true);
import {invalidDifferenceReason} from "./invalidIncomeDifferenceReason.js"

var submit = document.getElementById('submit');
submit.disabled = true;

submit.addEventListener('mouseover',(event)=>{
  invalidDifferenceReason()
})

console.log("running");
