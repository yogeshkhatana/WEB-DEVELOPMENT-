//Higher Order functions-> Map,Filter,Reduce


let arr=[1,2,3,4,5,6];
//traditional way

// let darr=[];
// for(let i=0;i<arr.length;i++)
// {
//     darr[i]=arr[i]*2;
// }
// console.log(darr);

//Map function ->it is a higher order function.
// higher order function->that either accepts function as an argument or return a function
// map can be attached to an Array
//map doesn't make changes in original array
//map applies operation on every element


// let darr=arr.map(function(el){
//     return el*2;
// })
// console.log(darr);

//  OR  both works same
let df=function(el)
{
    return el*2;
}
let darr=arr.map(df);
console.log(darr);



////////////////////////FILTER////////////////////////

// filter only returns true value as output

let words=['spray','limit','elite','polite','destruction','presents'];
//without filter

let warr=[];
for(let i=0;i<words.length;i++)
{
    if(words[i].length>6)
    {
        warr.push(words[i]);
    }
}
console.log(warr);

//with filter

let wfarr=words.filter(function(word){
    return word.length>6;
})

console.log(wfarr);


///////////////////////REDUCE///////////////////////////

//Without Reduce
arr=[1,2,3,4,5,6];
let sum=0;
for(let i=0;i<arr.length;i++)
{
    sum+=arr[i];
}
console.log(sum);

//With Reduce
// acc->accumulator  ->used to accumulate result,cval->current value for traversing

let rsum=arr.reduce(function(acc,cval){
    console.log('acc -->'+acc+" "+'cval --> '+cval);
    return acc+cval;
})
console.log(rsum);