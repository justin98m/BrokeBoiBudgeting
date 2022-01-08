//converts html dates to js date object so they can be compared
function toDateObject(date){
  //Date object takes (year, MonthIndex,day) for this purpose
  //date come in format month(Not Indexed)-day-year
//  console.log(date);
  var month = parseInt(date.slice(0,2)) - 1
  //console.log("month: ",month);
  var day = date.slice(2,4)
  //console.log("day: ", day);
  var year = date.slice(4)
  //console.log('year: ', year);
  var convertedDate = new Date(year,month, day)
  return convertedDate
}

export default toDateObject;
