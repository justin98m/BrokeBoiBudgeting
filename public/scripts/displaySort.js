import dateToHTML from './dateToHTML.js'
//inserted sorted data into html based on indicated direction
var displaySort = function (rowData,htmlTable,direction){
  let date = ''
  let dollars = ''
  var rowpos = 0
  if(direction === 'ascend'){
    for (var i = 0; i < rowData.length; i++) {
      date = dateToHTML(rowData[i].date)
      dollars = '$' + String(rowData[i].dollars)
      htmlTable[i].querySelector(".date").innerHTML = date
      htmlTable[i].querySelector(".dollars").innerHTML = dollars
      htmlTable[i].querySelector(".name").innerHTML = rowData[i].name
      htmlTable[i].id = rowData[i].id

    }
    console.log("Ascending  the HTML");
  }
  else if(direction === 'descend'){
    rowpos = 0
    for (var i = rowData.length-1; i >= 0; i--) {
      date = dateToHTML(rowData[i].date)
      dollars = '$' + String(rowData[i].dollars)
      htmlTable[rowpos].querySelector(".date").innerHTML = date
      htmlTable[rowpos].querySelector(".dollars").innerHTML = dollars
      htmlTable[rowpos].querySelector(".name").innerHTML = rowData[i].name
      htmlTable[rowpos].id = rowData[i].id
      rowpos++
    }
      console.log("Descending the HTML");
  }
  else {alert('ERRORRRR')  }
  //console.log('running');
}

export default displaySort
