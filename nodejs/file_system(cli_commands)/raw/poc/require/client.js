//require-> needs path of the js file from which we need to import our code
let libFileObj=require("./lib.js");   //in lib.js .js is optional
//const {fxn,varName}=require("./lib");  it directly imports things in this file can be directly called like fxn()
console.log(libFileObj.varName);
console.log(libFileObj.fxn);
console.log(libFileObj.fxn());
