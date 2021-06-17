const state={
    name:'Yogesh',
    address:{
        city:"London",
        country:{
            countryName:'Unuited Kingdom',
            countryCode:'UK'
        }
    }
}
//i need to make changes into this object immutably
// let copy=state;   //here memory address of both objects is same
// copy.name='Alexander';
// console.log(state);
// console.log(copy);

let copy={...state};//so bcoz of spread operator memory address of both objects is different
copy.name="Alexander";
console.log(state);
console.log(copy);

copy.address.city="Delhi";//here changes in both objects bcoz when there is nested objects so the objects inside an object also have a different memory address so while we use spread operator it changes only outermost object address not inside ones so inner objects changes affect in both objects
console.log(state);
console.log(copy);

//we can also do that to make it immutable given below
