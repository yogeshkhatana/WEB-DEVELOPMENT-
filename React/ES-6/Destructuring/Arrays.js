let introduction=['Hello',"I",'Am',"Yogesh"];
// let greeting=introduction[0];
// let pronoun=introduction[1];
// let variable=introduction[2];
// let name=introduction[3];

//normal destructuring
// let [greeting,pronoun,variable,name]=introduction;//Destructuring
// console.log(greeting);
// console.log(pronoun);
// console.log(variable);
// console.log(name);
// console.log("**************************************");

// Destructuring with skipping values
// let [greeting,pronoun,,name]=introduction;
// console.log(greeting);
// console.log(pronoun);
// console.log(name);

//default values
let newArr=['Hi'];
let [greeting='Howdy',pronoun='ghys',variable,name='open']=newArr;
console.log(greeting);
console.log(pronoun);
console.log(variable);
console.log(name);

//swapping variables without 3rd variable
let a=5;
let b=8;
[a,b]=[b,a];//swapping with help of arrays
console.log(a);
console.log(b);

//Spread Operator->   ...
let arr=[1,2,3,4,5,6,7,8,9];
let [fv,sv,tv,...narr]=arr;
console.log(fv);
console.log(sv);
console.log(tv);
console.log(narr);
narr[0]=40;
console.log(narr);
console.log(arr);
//memory is different of both arr and narr bcoz when we change value i.e narr[0]=40; it only changes in narr so memory are different

