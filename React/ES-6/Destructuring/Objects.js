let person={name:'Steve',country:'Los Angeles',job:'Avenger'};
// let name =person.name;
// let otherName=person['name'];
// console.log(name);
// console.log(otherName);

//Destructuring
let {name,country,profession='default-value',job}=person;//parameters should be same as keys
console.log(name);
console.log(country);
console.log(profession);//it takes undefined bcoz no value given otherwise take default value given
console.log(job);

/////////////////Aliases//////////////////////////
let {name:a,country:b,job:c}=person;
console.log(a);
console.log(b);
console.log(c);