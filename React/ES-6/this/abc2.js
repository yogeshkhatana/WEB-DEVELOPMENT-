// function fn(){
    
//     console.log(`Hi my name is ${this.person}`);
//     console.log(this);
//     function abc(){
//         console.log(this.person);
//     }
//     abc();
// }

// let obj={ 
//     person:'Yogesh',
//     fon:fn 
// }
// obj.fon();

//////////////solution 1 using bind->with help of bind we can access person with abc() function.

//let ret=function.bind(argument);
//ret is  a function
//ret ka jo this h that becomes equal to the passed argument


// function fn(){
    
//     console.log(`Hi my name is ${this.person}`);
//     console.log(this);
//     function abc(){
//         console.log(this.person);
//     }
//     let rf=abc.bind(this);
//     rf();
// }

// let obj={ 
//     person:'Yogesh',
//     fon:fn 
// }
// obj.fon();

////////////Solution 2 using Arrow function->Here  arrow function makes this of lexical superior/immediate parent function its own this

function fn(){
    
    console.log(`Hi my name is ${this.person}`);
    console.log(this);
    
    let abc=()=>{
        console.log(this.person);
    }
}

let obj={ 
    person:'Yogesh',
    fon:fn 
}
obj.fon();