let fs=require("fs");
let path=require("path");
let input=process.argv.slice(2);
//nodejs->src file path
//dest path->file path
//copyFileSync->copy content of one file to annother, it doesn't directly copies file,if file is not presnt then it create a new file at dest and then copy content to it
fs.copyFileSync(input[0],path.join(input[1],"sample.js"));//it holds the path of file which is to be created
console.log("file Copied!!");
//if file present already in dest location then content override