//Days are 1-31
//Months are 0-11


  //converts html 's year-Month-Day Format To MonthDayYear Format
var convertDate = function(input){
  //input = input.toString().replace(/,/g,'')
  console.log('Original: ',input);
  //newdate = input.splice(8) + input.splice(5,7) + input.splice(0,4)
  newdate = input.split('-')

  input = newdate[1] + newdate[2] + newdate[0]
  console.log('Converted: ', input)
  return input;
}


exports.convert = convertDate;
