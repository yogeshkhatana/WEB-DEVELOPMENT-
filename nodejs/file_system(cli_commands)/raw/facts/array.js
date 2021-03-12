//java->array is collection of homogeneous data types
//javascript->array is collection of anything
//there is no array->array emulated

let arr;
arr=[
    1,
    1.1,
    "string",
    'a char string',
    true,
    null,
    function sayHi()
    {
        console.log("Fn inside sayHii");
        return "returned from array";
    },
    [1,2,3,4,5,6]
]
//loop
for(let i=0;i<arr.length;i++)
{
 console.log("idx",i,arr[i]);
}
