let fs=require("fs");
console.log("Before");
//async function fs.readFile
fs.readFile("f1.txt",cb);
function cb(err,data)
{
    if(err)
    console.log(err);
    else{
    console.log("Content->"+data);
    fs.readFile("f2.txt",cb2);
}
}

function cb2(err,data)
{
    if(err)
    console.log(err);
    else{
    console.log("Content->"+data);
    fs.readFile("f3.txt",cb3);
}
}

function cb3(err,data)
{
    if(err)
    console.log(err);
    else{
    console.log("Content->"+data);
    
}
}

console.log("After");


