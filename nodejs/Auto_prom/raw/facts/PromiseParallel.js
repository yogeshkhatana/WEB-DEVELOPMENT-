let fs=require("fs");
console.log("Before");

let f1p=fs.promises.readFile("f1.txt");
let f2p=fs.promises.readFile("f2.txt");
let f3p=fs.promises.readFile("./f3.txt");

f1p.then(cb);
f2p.then(cb);
f3p.then(cb);

function cb(data)
{
    console.log("data->"+data);
}



console.log("After");
console.log("other");