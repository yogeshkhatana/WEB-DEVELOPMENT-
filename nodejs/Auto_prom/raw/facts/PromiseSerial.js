let fs=require("fs").promises;
console.log("Before");
//async function fs.readFile
//con-we need to attach catch for every then 
//brute force

let frp=fs.readFile("f1.txt");
frp.then(cb)
function cb(data)
{
    console.log("Content->"+data);
    let f2rp=fs.readFile("f2.txt");
    f2rp.then(cb2);
}

function cb2(data)
{
    console.log("Content->"+data);
    let f3rp=fs.readFile("f3.txt");
    f3rp.then(cb3);
}

function cb3(data)
{
    console.log("Content->"+data);
}

console.log("After");

//Improvement

