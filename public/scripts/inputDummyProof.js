/*THis Script will ensure dollar values put in forms are
  **Positve Numbers
      *AND
  **Integers
*/
document.addEventListener('DOMContentLoaded',() =>{
  console.log("Page Loaded");

  var number = document.getElementsByClassName('dollar')
  var forms = document.getElementsByClassName('divForm')

  let postitiveNumber = function(num){
    //console.log("this Number: ", num)
    if(num < 0){
      num *= -1
      alert("Negative Numbers are not Allowed. Add a Positive expense to take money away.")
      console.log("Now is positive ++++++++++: ",num);
      return num
    }
    return num
  }
  let roundup = function(num){ num = Math.round(num) ; return num}
  let convertToNumber = function(num){
    num = parseInt(num)
    if(isNaN(num))
      num = 0
    return num

  }
  //verifies current dollar value is a valid number and changes it to one if inValid
  let validNumber = function(){
    num = this.value
    //console.log("A Change has occurred")
    num = convertToNumber(num)
    num = roundup(num)
    num = postitiveNumber(num)
    this.value = num
    //console.log("This Value after function calls", this.value);
  }

  //check for any dollar amount changes and round them to a whole number
  //plus side is if it's not a number the text is set to 0

  for(i=0;i<number.length;i++){
    //Parenthases after roundup will break code dont ask why
    number[i].addEventListener('change',validNumber)
    console.log(number[i])

  }
})
