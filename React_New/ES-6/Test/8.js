const object={
    message:"Hello World",
    logMessage(){
        console.log(this.message);//What is logged

    }

};
setTimeout(logMessage,1000);

//Output->Undefined bcoz window object is used bcoz of exception