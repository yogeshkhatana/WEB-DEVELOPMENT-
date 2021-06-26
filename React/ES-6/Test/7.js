function Pet(person) {
    this.person =person;
     this.getName = function()
     {
         console.log(this);
         return this.person
     }
    }
    const cat = new Pet('Fluffy');//cat is a object and it bcomes this of function here(or if class is there so it bcomes this of class)
    console.log(cat.getName()); // What is logged?
    const { getName } = cat;//destructuring
    console.log(getName()); // What is logged?

    // Output-> Fluppy
            // -> Fluppy    