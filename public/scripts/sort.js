import toDateObject from './toDateObject.js'
import bubblesort from './bubblesort.js'
import displaySort from './displaySort.js'

var defaultSort = {column : "date",  direction : "ascend" }
var htmlTable = document.getElementsByClassName('row')
let sortBar = document.getElementById('sortBar')
//default for both buttons, changing of id  after load wont change the actual node
let ascend = document.getElementById('active')
let descend = document.getElementById('inactive')
let rowData = storeRowData()
let sortBy = defaultSort

callBubblsort(defaultSort)
//change the select bar update the table
sortBar.addEventListener('change',(event) => {
  sortBy = {
    column : sortBar.value,
    direction : document.querySelector('#active').name
  }
  console.log("Cureent Direction ", sortBy.direction);
  callBubblsort(sortBy)
})
//change the direction to Descending update the table
descend.addEventListener('click',(event)=>{
  //dont sort if already in desired direction
  if(descend.id != 'active'){
    descend.id = "active"
    ascend.id ="inactive"
    sortBy.direction = "descend"
    console.log("Descender ",sortBy );
    callBubblsort(sortBy)
  }
})
//change direction to Ascending update the table
ascend.addEventListener('click',(event)=>{
  //dont sort if already in desired direction
  if(ascend.id != "active"){
    ascend.id = "active"
    descend.id = "inactive"
    sortBy.direction = "ascend"
    console.log("Ascender", sortBy);
    callBubblsort(sortBy)
}
})

function callBubblsort(sortBy){
  bubblesort(rowData,sortBy.column, (sortedData)=>{
      displaySort(sortedData,htmlTable,sortBy.direction)
    })
}


//put html table information in to an array of objects containing all column info
function storeRowData(){
  var rowData = new Array()
  var type,tableRow,date,id,fund
  for (var i = 0; i <htmlTable.length; i++) {
    //a copy is made so when values of htmlTable are written over the
    //row Data values wont change, specifically classList
    tableRow = htmlTable[i].cloneNode(true)
    //some function callers will not have a row with a date
    if (tableRow.querySelector(".date") !== null) {
      date = toDateObject(tableRow.querySelector(".date").innerHTML)
    }
    else {
      defaultSort.column = "name"
      date = false
    }
    if(tableRow.querySelector(".id") !== null){
      id = tableRow.querySelector(".id").outerHTML
    }
    else{id=false}
    if(tableRow.querySelector(".fund") !== null){
      fund = tableRow.querySelector(".fund").outerHTML
    }
    else{fund = false}

    rowData[i] = {
      date: date,
      //this helps determine how to display the value
      classList: tableRow.querySelector(".dollars").classList,
      //get dollar string, remove dollar sign and turn into a number
      dollars: parseInt(tableRow.querySelector(".dollars").innerHTML.slice(1)),
      name: tableRow.querySelector(".name").innerHTML,
      id : id,
      fund: fund
    }
  console.log("This fund: ",fund);
  }
  return rowData
}
