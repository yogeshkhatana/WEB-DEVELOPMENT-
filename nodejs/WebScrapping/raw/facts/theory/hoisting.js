console.log("a",a);
var a;
console.log("a",a);
a=10;
console.log("a",a);
hello();
function hello()
{
    console.log("Hello All");
}

///varName;
hello();
//varName();
var varName=function()  //function expression
{
    console.log("I am expression");
}
varName();