let fs=require("fs");
console.log("Before");
fs.readFile("f1.txt",cb);//cb here is callback function that is automatically called by nodejs when other code completely runned
function cb(err,data)
{
 if(err)
 console.log(err);
 else
 console.log("Content->"+data);
}
console.log("After");