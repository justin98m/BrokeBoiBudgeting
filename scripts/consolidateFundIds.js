var fundIds = function(category){

//The first fundid is set manually because
//it ensures nested loop runs and is gurenteed to be a unique ID
fundIds = [category[0].fundId]
//loop compiles all the unique fundids associate with all categorys pulled
for (var i = 0; i < category.length; i++) {
    for (var n = 0; n < fundIds.length; n++) {
      //fundId already exist in list so skip to the next category
      if(category[i].fundId == fundIds[n]){
        //console.log(category[i].fundId," already exist in list: ", fundIds);
        break
      }
      else if(n == fundIds.length -1) {
          //same as pushing the unique id into the array
          fundIds[fundIds.length] = category[i].fundId
      }
    }
  }
  return fundIds
}
exports.fundIds = fundIds
