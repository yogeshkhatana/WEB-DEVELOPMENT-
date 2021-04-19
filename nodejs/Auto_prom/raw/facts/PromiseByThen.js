let fs=require("fs");
let frp=fs.promises.readFile("f1.txt");
console.log("Before",frp);

let thenKP=frp.then(cb);
console.log("Then ka promise",thenKP);
//cb behaves in apparticular manner

function cb(data)
{
    console.log("Data "+data);
    return new Promise(function()
    {

    });//returning a promise
    // return 10;   returning a value
}

setTimeout(function(){
    console.log("then ka promise",thenKP);
},1000);

console.log("After");

//thenKp depends on cb return value
//if value returned from cb->we got value in thenKp after thenKp resolved
//when nothing is returned from cb-> we got undefined . .. .. . . . .. 
//When pending promise is returned from cb->thenKp will wait for that pending promise
