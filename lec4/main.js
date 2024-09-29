// 1)  Write a function that takes two or more
//  objects as arguments and merges them into a single object
function mergeObjects(...objects) {
    return Object.assign({}, ...objects);
}
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = mergeObjects(obj1, obj2);
console.log(merged); 



//   2)  Write a function that takes an object 
//   and a key as input and deletes the specified key from the object.
function deleteKey(obj, key) {
    delete obj[key];
    return obj;
}
const car = { make: "Toyota", model: "Corolla", year: 2020 };
const updatedCar = deleteKey(car, "model");
console.log(updatedCar); 



//   3) Create an object representing a car
//    with properties for make, model, and year. Then
//     add a method that returns the car's full description.
const car2 = {
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    getDescription: function() {
      return `${this.year} ${this.make} ${this.model}`;
    }
  };
  console.log(car2.getDescription());
  

  
//   4) Create an object representing a shopping
//    cart. Add methods to add items, remove items,
//     and calculate the total price.
const shoppingCart = {
    items: [],
  
    addItem: function(name, price, quantity) {
      this.items.push({ name, price, quantity });
    },
 
    removeItem: function(name) {
      this.items = this.items.filter(item => item.name !== name);
    },
  
    calculateTotal: function() {
      return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  };

  shoppingCart.addItem("Apple", 1, 3); 
  shoppingCart.addItem("Banana", 2, 2); 
  console.log(shoppingCart.calculateTotal()); 
  
  shoppingCart.removeItem("Apple"); 
  console.log(shoppingCart.calculateTotal()); 
  