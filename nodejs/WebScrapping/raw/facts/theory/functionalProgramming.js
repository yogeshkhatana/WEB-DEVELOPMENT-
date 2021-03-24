//functions are treated as a variable so,->we can pass functions inside functions
function fn(a)
{
    console.log(a);
    a();
}

// fn([1,2,3,4,5]);
// fn("I am a Param");

function inner()
{
    console.log("I will be passed as a param");
}

fn(inner);//function inside function

//array functions->map,reduce,filter
function squarer(x)
{
    return x*x;
}
//map
let arr=[1,2,3,4,5];
function map(arr,cb)
{
    let tempArr=[];
    for(let i=0;i<arr.length;i++)
    {
        let sVal=squarer(arr[i]);
        tempArr.push(sVal);
    }
    return tempArr;
}

let newArr=map(arr,squarer);
console.log(newArr);
