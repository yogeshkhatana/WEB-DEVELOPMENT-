let user={
    id:339,
    name:'frad',
    age:42,
    education:{
        degree:'Masters',
        school:{
            name:'SPS',
            location:'Pitampura'
        }
    }
}

//I have to get the value of degree
//traditional way
console.log(user.education.degree);

//destructuring way

let {education:{degree}}=user;
console.log(degree);
let {education:{school:{location}}}=user;
console.log(location)