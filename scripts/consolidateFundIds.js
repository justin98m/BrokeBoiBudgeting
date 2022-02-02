var fundIds = function(category){

//The first fundid is set manually because
//it ensures nested loop runs and must be a unique ID
var fundId = [category[0].fundId]
//loop compiles all the unique fundids associate with all categorys pulled
for (var i = 0; i < category.length; i++) {
    for (var n = 0; n < fundId.length; n++) {
      //this fundId already exist in list so skip to the next category
      if(category[i].fundId == fundId[n]){
        //console.log(category[i].fundId," already exist in list: ", fundIds);
        break
      }
      else if(n == fundId.length -1) {
          //same as pushing the unique id into the array
          fundId[fundId.length] = category[i].fundId
      }
    }
  }
  console.log("Fund IDS:", fundId);
  return fundId
}
exports.fundIds = fundIds
