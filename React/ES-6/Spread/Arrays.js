//Use of spread in arrays in react is to get immutablity bcoz it is required in react

let arr=[0,1,2,3,4,5,6];
let index=3;
//let i have t insert a number 10 at index 3
//i have to make this change not in this array(Imuutably)

//traditional way
// let narr=[];
// for(let i=0;i<index;i++)
// {
//     narr[i]=arr[i];
// }
// narr.push(10);
// for(let i=index;i<arr.length;i++)
// {
//     narr.push(arr[i]);
// }
// console.log(narr);
// console.log(arr);

//using spread operator
let narr=[...arr.slice(0,index),10,...arr.slice(index)];//here changes in narr not reflect back to arr bcoz both the arrays have different address bcoz of spread operator
console.log(narr);
let earr=[...arr];//using spread operator so that both arrays have different address and wrapping in array to get output in an array
earr[0]=1000;
console.log(arr);
console.log(earr);
let earr2=arr;
earr2[0]=100;
console.log(earr2);//not using spread operator so same adress of both earr2 and arr so changes reflects in both
console.log(arr);
