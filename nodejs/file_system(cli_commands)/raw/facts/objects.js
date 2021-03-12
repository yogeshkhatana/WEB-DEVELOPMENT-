//object
let captain={
    name:"Steve",
    lastName:"Rogers",
    address:{
        state:"New York",
        city:"Manhattan"
    },
    age:35,
    isAvenger:true,
    movies:["civil war","First Avenger","age of ultron"],
    sayHi:function(){
        console.log("Line no 13 cap say hi");
        return "blessing from caps";
    }
};
//Get
console.log(captain);
console.log(captain.name);
console.log(captain.address.city);
console.log(captain.movies[1]);
console.log(captain.sayHi());
console.log(captain.abc);//because it literraly matches the abc

//set and update
captain.friends=["tony","bruce",'peter'];
captain.isAvenger=false;
console.log(captain);
//Delete
delete captain.movies;
console.log("**************************");
console.log(captain);

//for in loop
for(let key in captain)
{
    console.log("Key :",key ,"||value:",captain[key]);    
}


