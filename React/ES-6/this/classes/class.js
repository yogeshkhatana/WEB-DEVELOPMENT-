//in javascript there is no classes earlier,classes comes when es6 comes
//in classes here 'use strict' is here by default in class functions only eg->sayHi() here
// class abc{
//     //here in js we made data members in constructor
//     constructor(name,age)
//     {
//       this.name=name;   //inside constructor this is equal to obj
//       this.age=age;
//       this.sayHi=this.sayHi.bind(this);//when we want to access name with help of bind in case of class-solution 1 using bind(fixing this of function)
//     }

//     sayHi(){
//         console.log('Hello');
//         console.log(this);
//         console.log(this.name);
//     }
// }

// let obj=new abc('Yogesh',22);
// console.log(obj);
// //   obj.sayHi();

// // let ret=obj.sayHi;
// // ret();//bcoz here this is of window object but due to by default of 'use strict' in classes it gives this as undefined

// let btn=document.querySelector('button');
// console.log(btn);
// btn.addEventListener('click',obj.sayHi);//obj.sayHi is a function definition only it is called when btn is clicked and here function is called by button so this becomes button




///////////////Second solution using Arrow function
class abc{
    //here in js we made data members in constructor
    constructor(name,age)
    {
      this.name=name;
      this.age=age;
      
    }

    sayHi=()=>{//just use this way we are able to do it
        console.log('Hello');
        console.log(this);
        console.log(this.name);
    }
}

let obj=new abc('Yogesh',22);
console.log(obj);

let btn=document.querySelector('button');
console.log(btn);
btn.addEventListener('click',obj.sayHi);//obj.sayHi is a function definition only it is called when btn is clicked and here function is called by button so this becomes button


//Exception
setTimeout(obj.sayHi,1000);
//it gives this as window object instead of undefined this bcoz its an exception


