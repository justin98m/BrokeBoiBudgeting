
function swap(rowData, index){
  var temp = rowData[index]
  rowData[index] = rowData[index+1]
  rowData[index+1] = temp
}
//console.log(rowData);
//how come the log hello never fires???
var bubblesort = function(rowData,field,displaySort){
  for (var i = 0; i < rowData.length-1; i++) {
    for (var c = 0; c < rowData.length-i-1; c++) {
      switch (field) {
        case 'date':
          if(rowData[c].date > rowData[c+1].date){swap(rowData,c)}
          break;
        case 'dollars':
          if(rowData[c].dollars > rowData[c+1].dollars){swap(rowData,c)}
          break;
        case 'name':
            if(rowData[c].name.toLowerCase() > rowData[c+1].name.toLowerCase())
            {swap(rowData,c)}
            break;
        }
      }
  }
  console.log(rowData)
  displaySort()
}
export default bubblesort
