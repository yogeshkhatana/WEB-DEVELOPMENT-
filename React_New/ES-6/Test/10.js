//This only of class and function not of object
//in case of bind and arrow->This will be predecided and never changed
const object = {
    who: 'World',
    greet() {
    return `Hello, ${this.who}!`;
    },
    farewell: () => {
    return `Goodbye, ${this.who}!`;
    }
   };
   console.log(object.greet()); // What is logged?
   console.log(object.farewell()); // What is logged?
   
//    output->hello World
//          ->Goodbye undefined   bcoz here this is window object bcoz arrow  function takes this of parent that is window object