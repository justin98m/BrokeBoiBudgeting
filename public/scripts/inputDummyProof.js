let postitiveNumber = function(num){
  //console.log("this Number: ", num)
  if(num < 0){
    num *= -1
    alert("Negative Dollar Values ar not allowed")
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
export function validNumber(num){
  //console.log("A Change has occurred")
  num = convertToNumber(num)
  num = roundup(num)
  num = postitiveNumber(num)
  return num
  //console.log("This Value after function calls", this.value);
}
