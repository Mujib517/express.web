const emp = {
    name: "John",
    age: 25,
    dept: "HR",
    active: true
};

emp.newProp = "fakdjfkj";

delete emp.active;


console.log(emp);