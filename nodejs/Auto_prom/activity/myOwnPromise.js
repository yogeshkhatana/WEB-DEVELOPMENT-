//converting callback to promise(cb->promise)
//inbuilt->nodejs  -> fs.promises.readFile
//resolve->work complete
//reject->work fail

let fs=require("fs");
function promisifiedReadFile(filePath)
{
    //pending state promise
    //wrap it inside a Promise object
    return new Promise(function(resolve,reject)
    {
        fs.readFile(filePath,function cb(err,data)
        {
            if(err)
            //reject->work fail
            reject(err);
            else
            {
                //resolve->work complete
                resolve(data);
            }
        });
    });
}
//achieve->user
let fReadPromise=promisifiedReadFile("f1.txt");
console.log(fReadPromise);
//to consume promise we have 2 synchronous functions->then and catch
fReadPromise
    .then(function(data)
    {
        console.log("contents->",data);
    })
fReadPromise
    .catch(function(err)
    {
        console.log(err);
    })      