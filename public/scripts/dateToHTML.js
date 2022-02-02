var dateToHTML = function(date){
  if(date){
    var month = String(date.getMonth() + 1)
    var day = String(date.getDate())
    var year = String(date.getFullYear())
    return month +  '-' + day + '-' + year
  }
//display sort function may pass empty date var and this false tell the display sort
//function the date doesnt exist and not to display it
return false
}

export default dateToHTML
