//function array objects
//function definition
function fn(a){
    console.log("Hello from fn");
    console.log("parameter is",a);
    let rval=Math.random()>0.5?true:"Very good";
    return rval;
}
//if nothing is returned by function then undefined returned by default

//function invocation
fn("Hello");
fn(null);
fn([1,'dyg',null]);
let rval=fn("Good");
console.log("returned value is",rval);

