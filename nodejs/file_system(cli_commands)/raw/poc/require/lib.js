function fn()
{
    console.log("I was called from lib");
}
let a=20;
let b=10;

//inbuilt keyword
module.exports={
    varName:a,  //same a:a, key and value can have same name if we want
    fxn:fn
}