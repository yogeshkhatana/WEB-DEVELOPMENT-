let fs=require("fs");
console.log("Before");
let data=fs.readFileSync("f1.txt","utf8");//using sync function
console.log("content->",data);//encoding should be given here utf8 otherwise it gives result in buffer hexadecimal
console.log("conntent->"+data);
console.log("After");//but in case of '+' used for concatenation it gives proper output in text without utf8
