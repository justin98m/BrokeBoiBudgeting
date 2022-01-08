var dateToHTML = function(date){

  var month = String(date.getMonth() + 1)
  var day = String(date.getDate())
  var year = String(date.getFullYear())
  return month +  '-' + day + '-' + year

}

export default dateToHTML
