let fs=require("fs");
//await can be used inside ->async function

//Using Await
(async function(){
    let frp=fs.promises.readFile("f1.txt");
    console.log("Before adding await");
    let data=await frp;
    console.log("data->"+data);
    console.log("After reading data");
    let f2p=fs.promises.readFile("f2.txt");
    let sFileData=await f2p;
    console.log("data"+sFileData);
})();
console.log("After");
console.log("OTHER");

console.log("````````````````````````````````````````");

//                   OR
//Without using Await->Simply using then

// (async function(){
//     let frp=fs.promises.readFile("f1.txt");
//     console.log("Before adding await");
//     frp.then(function(data){
//         console.log("data->"+data);
//         console.log("After reading data"); 
//            let f2p=fs.promises.readFile("f2.txt");
//            return f2p;
//     }).then(function(data)
// {
//     console.log("sFiledata->"+data);
// })
    
// })();
// console.log("After");
// console.log("OTHER");


