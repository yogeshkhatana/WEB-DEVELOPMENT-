let fs=require("fs");
console.log("Before");
let p1=fs.promises.readFile("f1.txt");//these 3 files giving token that is promise in pending state
let p2=fs.promises.readFile("f2.txt");
let p3=fs.promises.readFile("f3.txt");

//promises.all is used to wrap more than one promises
let combinedPromise=Promise.all([p1,p2,p3]);//pushing all 3 promises in an array to form combinedPromise
console.log(combinedPromise);
combinedPromise.then(function(combinedFilesData)//it will run when data comes i.e when all 3 promises work completes
{
 for(let i=0;i<combinedFilesData.length;i++)
 {
     console.log("contents->"+combinedFilesData[i]);
 }
})
console.log("After");