let fs=require("fs").promises;//it will require fs.promises in fs
let arr=["f1.txt","f2.txt","f3.txt"];
console.log("Before");
let frp=fs.readFile(arr[0]);//not writing fs.promises.readFile bcoz required above in fs
for(let i=1;i<arr.length;i++)
{
    frp=frp.then(function(data){
        console.log("content"+data);
        return fs.readFile(arr[i]);
    })
}

console.log("After");
//to consume last one       
frp.then(function(data){
    console.log("content"+data);
})