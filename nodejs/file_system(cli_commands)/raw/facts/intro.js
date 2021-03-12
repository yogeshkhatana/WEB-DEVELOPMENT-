//no main
//top->bottom ,left->right
console.log("Hello PP :)");
//variable declare
let a;
console.log("a:",a);
//undefined no type
//basic data types->undefined,number,string,boolean,null
//statically typed language like java,cpp eg:-int a; here int statically typed
a=10.55;
console.log(typeof(a));
console.log("a: ",a)
a="Hello i am a string"
console.log("a: ",a)

let flag=true;
let number=17;
for(let i=2;i*i<=number;i++)
{
    if(number%2==0)
    {flag=false;
    break;}

}
if(flag==true)
console.log(number,"Prime")
else
console.log(number,"Not Prime")
