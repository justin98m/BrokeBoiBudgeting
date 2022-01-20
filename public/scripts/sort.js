import toDateObject from './toDateObject.js'
import bubblesort from './bubblesort.js'
import displaySort from './displaySort.js'

var htmlTable = document.getElementsByClassName('row')
let sortBar = document.getElementById('sortBar')

//default for both buttons, changing of id  after load wont change the actual node
let ascend = document.getElementById('active')
let descend = document.getElementById('inactive')
let rowData = storeRowData()
const defaultSort = {column : "date",  direction : "ascend" }
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
  bubblesort(rowData,sortBy.column, ()=>{
      displaySort(rowData,htmlTable,sortBy.direction)
    })
}


//put html table information in to an array of objects containing all column info
function storeRowData(){
  var rowData = new Array()
  for (var i = 0; i <htmlTable.length; i++) {

    rowData[i] = {
      date: toDateObject(htmlTable[i].querySelector(".date").innerHTML),
      id: htmlTable[i].id,
      //get dollar string, remove dollar sign and turn into a number
      dollars: parseInt(htmlTable[i].querySelector(".dollars").innerHTML.slice(1)),
      name: htmlTable[i].querySelector(".name").innerHTML
    }
  }
  return rowData
}
