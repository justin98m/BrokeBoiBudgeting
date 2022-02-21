import dateToHTML from './dateToHTML.js'
//inserted sorted data into html based on indicated direction
var displaySort = function (rowData,htmlTable,direction){
  var rowpos,date,dollars
  if(direction === 'ascend'){
    //Changing row Nodes to reflect sorted rowData Information
    for (var i = 0; i < rowData.length; i++) {
      date = dateToHTML(rowData[i].date)
      dollars = '$' + String(rowData[i].dollars)
      dollars = addNegative(rowData[i].classList) + dollars
      if(date){
        htmlTable[i].querySelector(".date").innerHTML = date
      }
      if(rowData[i].id){
        htmlTable[i].querySelector(".id").outerHTML = rowData[i].id
      }
      if(rowData[i].fund){
        htmlTable[i].querySelector(".fund").outerHTML = rowData[i].fund
      }
      htmlTable[i].querySelector(".dollars").innerHTML = dollars
      htmlTable[i].querySelector(".dollars").classList = rowData[i].classList
      htmlTable[i].querySelector(".name").innerHTML = rowData[i].name
        }
    console.log("Ascending  the HTML");
  }
  else if(direction === 'descend'){
    //Replacing row nodes in reverse order with rowData information
    rowpos = 0
    for (var i = rowData.length-1; i >= 0; i--) {
      date = dateToHTML(rowData[i].date)
      dollars = '$' + String(rowData[i].dollars)
      dollars = addNegative(rowData[i].classList) + dollars
      if(date){
        htmlTable[rowpos].querySelector(".date").innerHTML = date
      }
      if(rowData[i].id){
          htmlTable[rowpos].querySelector(".id").outerHTML = rowData[i].id
      }
      if(rowData[i].fund){
        htmlTable[rowpos].querySelector(".fund").outerHTML = rowData[i].fund
      }
      htmlTable[rowpos].querySelector(".dollars").innerHTML = dollars
      htmlTable[rowpos].querySelector(".dollars").classList = rowData[i].classList
      htmlTable[rowpos].querySelector(".name").innerHTML = rowData[i].name
      rowpos++
    }
      console.log("Descending the HTML");
  }
  else {alert('ERRORRRR')  }
  //console.log('running');
}
function addNegative(classList){

  var type = String(classList[1])
  switch (type) {
    case "expense":
      return "-"
      break;
    default:
      return ""

  }
}
export default displaySort
