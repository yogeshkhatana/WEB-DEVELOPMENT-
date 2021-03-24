let fs=require("fs");
let content=fs.readFileSync("abc.json");
//console.log(content+"");//to get output in string form

//JSON.parse used to get output in json
let json=JSON.parse(content);//to get output in json form
//console.log(json);

//stringify used to write and to convert into string

json.push(
    {
        "name":"sarvan",
        "lname":"Kumar",
        "age":21,
        "address":{
            "state":"Haryana",
            "city":"Gurgaon"

        }
    }
)

console.log(json);
console.log(json[1].name);

fs.writeFileSync("abc.json",JSON.stringify(json));
console.log("file written to disk");
