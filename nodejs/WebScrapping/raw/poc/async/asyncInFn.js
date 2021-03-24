let fs=require("fs");
console.log("Before");

function fileReader(fileName)
{
    console.log("Before readfile");
    fs.readFile(fileName,cb);
    console.log("After readfile");
}


function cb(err,data)
{
 if(err)
 console.log(err);
 else
 console.log("Contents->"+data);
 fs.readFile("f2.txt",cb2);//callback inside callback fn so it can behave as a serial task
}

function cb2(err,data)
{
 if(err)
 console.log(err);
 else
 console.log("Contents->"+data);
 fs.readFile("f3.txt",cb3);
}

function cb3(err,data)
{
 if(err)
 console.log(err);
 else
 console.log("Contents->"+data);
 fs.readFile("f4.txt",cb4);
}

function cb4(err,data)
{
 if(err)
 console.log(err);
 else
 console.log("Contents->"+data);
 
}

fileReader("f1.txt");
console.log("After");