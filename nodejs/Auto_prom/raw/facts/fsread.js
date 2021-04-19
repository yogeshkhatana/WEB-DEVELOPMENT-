let fs=require("fs");
//callback is an older way to do async programming
//promises is a newer way
//promise return initial state is always pending
let promise=fs.promises.readFile("f1.txt");
console.log("Initial Value",promise);
console.log("After");

setTimeout(function()
{
    console.log("Final state",promise);
},2000);

//                 OR

//.then and .catch is better way then setTimeout function
//then used when work done and catch when error comes
//then and catch are async functions


//consumer function it will called when a promise is fullfilled
promise.then(function(data)
     {
         console.log(data);
     })
//reject
promise.catch(function(err)
{
    console.log("err",err);

})
console.log("hello");