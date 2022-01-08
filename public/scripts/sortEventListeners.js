import {sortBy,ascend,descend} from './sort.js'

sortBar.addEventListener('change',(event) => {
  sortBy = {
    column : sortBar.value,
    direction : document.querySelector('#active').name
  }
  console.log("Cureent Direction ", sortBy.direction);
  callBubblsort(sortBy)
})
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
