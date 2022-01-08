let validateDollars = function(num){
  console.log("Will dollar",num,"Make IT??");
  num = parseInt(num)
  if(!Number.isInteger(num)){
    console.log('Flaggine Here I Say');
    return false
  }
  else if(isNaN(num)){
    console.log('Flagging Here');
    return false;
  }
  else if(num < 0)
    return false
  num = Math.round(num)
  console.log('YES');
  return true
}
let validateName = function(name){
  console.log("Will Name",name,"Make IT??");
  if (name.length >= 60)
    return false
  else if(name.length == 0)
    return false
  console.log('yes');
  return true

}

let validate = function(test,value){
  console.log("Validate Is Now Running");
  switch (test) {
    case 'dollar':
      console.log('Dollar Test')
      if(!validateDollars(value))
        return false
      break
    case 'name':
      console.log('Name Test')
      if(!validateName(value))
        return false
      break

    default: return true

  }
//validation complete
return true
}
exports.validate = validate
