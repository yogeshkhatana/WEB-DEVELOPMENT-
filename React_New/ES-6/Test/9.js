//How you called logMessage so output will be Hello World
const object={
    message:"Hello World"
      }
function logMessage(){
    console.log(this.message);
}

//Answer->
let rf=logMessage.bind(object);
rf();