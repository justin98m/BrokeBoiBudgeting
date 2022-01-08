//Days are 1-31
//Months are 0-11
//Year is the Year
var Dayis = function(){
  let now = new Date()
  let day = [now.getMonth(),now.getDate(), now.getFullYear()]
  console.log("Date Constructor: ",now);
  console.log("Date.now: ", Date.now());
  console.log("My Format: ", day);
  //now = [now.getMonth(),now.getDate(), now.getFullYear()]
  let compare1 = new Date(09,17,2021)
  let compare2 = new Date(09,16,2021)
  let convert= new Date(day[2],day[1],day[0])
  console.log("Before: ", convert);


  if (compare1 < convert)
    console.log("Good");
  if(compare1 > compare2)
    console.log("also Good");


}
Dayis()
