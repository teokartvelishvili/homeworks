// 1) Create a Car class with properties make,
 //model, and year, then make instance of electric car 
 //which have battery level
class Car {
    constructor(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    }
  }
  
  class ElectricCar extends Car {
    constructor(make, model, year, batteryLevel) {
      super(make, model, year);
      this.batteryLevel = batteryLevel;
    }
  }
  
  const myElectricCar = new ElectricCar("Tesla", "Model S", 2023, 100);
  console.log(myElectricCar);
  
  // 2) Create a Library class that stores a list of books 
  //(as an array) which have following methods addBook(),
  // removeBook(), listBooks()
  class Library {
    constructor() {
      this.books = [];
    }
  
    addBook(book) {
      this.books.push(book);
    }
  
    removeBook(book) {
      this.books = this.books.filter(b => b !== book);
    }
  
    listBooks() {
      console.log("Books in library:");
      this.books.forEach(book => console.log(book));
    }
  }
  
  const myLibrary = new Library();
  myLibrary.addBook("JavaScript: The Good Parts");
  myLibrary.addBook("Clean Code");
  myLibrary.listBooks();
  myLibrary.removeBook("Clean Code");
  myLibrary.listBooks();
  
  // 3) Create a class Employee with a method
   //calculateSalary() that calculates salary based 
   //on hours worked and hourly rate.
  class Employee {
    calculateSalary(hoursWorked, hourlyRate) {
      return hoursWorked * hourlyRate;
    }
  }
  
  const employee = new Employee();
  console.log("Salary:", employee.calculateSalary(40, 20));
  
  // 4) Create a class ShoppingCart that holds a list of items.
  // methods, addItem(), deleteItem(), updateItem(), calculateTotal()
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(item) {
      this.items.push(item);
    }
  
    deleteItem(item) {
      this.items = this.items.filter(i => i !== item);
    }
  
    updateItem(oldItem, newItem) {
      const index = this.items.indexOf(oldItem);
      if (index !== -1) this.items[index] = newItem;
    }
  
    calculateTotal() {
      return this.items.reduce((total, item) => total + item.price, 0);
    }
  }
  
  const cart = new ShoppingCart();
  cart.addItem({ name: "Laptop", price: 1000 });
  cart.addItem({ name: "Mouse", price: 20 });
  cart.updateItem({ name: "Mouse", price: 20 }, { name: "Mouse", price: 25 });
  console.log("Total:", cart.calculateTotal());
  cart.deleteItem({ name: "Laptop", price: 1000 });
  console.log("Total after deletion:", cart.calculateTotal());
  
  // 5) Create a CarFactory class that have following methods,
  // addCar, deleteCar, updateCar, getAllCars
  class CarFactory {
    constructor() {
      this.cars = [];
    }
  
    addCar(car) {
      this.cars.push(car);
    }
  
    deleteCar(car) {
      this.cars = this.cars.filter(c => c !== car);
    }
  
    updateCar(oldCar, newCar) {
      const index = this.cars.indexOf(oldCar);
      if (index !== -1) this.cars[index] = newCar;
    }
  
    getAllCars() {
      console.log("All cars in factory:");
      this.cars.forEach(car => console.log(car));
    }
  }
  
  const factory = new CarFactory();
  factory.addCar(new Car("BMW", "X5", 2022));
  factory.addCar(new Car("Mercedes", "C-Class", 2023));
  factory.getAllCars();
  factory.deleteCar(new Car("BMW", "X5", 2022));
  factory.getAllCars();
  