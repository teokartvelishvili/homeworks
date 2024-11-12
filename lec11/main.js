
import fetch from 'node-fetch';
import fs from 'fs';

// 1. ფუნქცია API-დან მონაცემების წამოსაღებად და users.json-ში ჩასაწერად
async function fetchAndSaveUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const parsedUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
        }));

        fs.writeFileSync('users.json', JSON.stringify(parsedUsers, null, 2));
        console.log('მონაცემები ჩაიწერა users.json ფაილში');
    } catch (error) {
        console.error('შეცდომა:', error);
    }
}

// 2. ფუნქცია მანქანის ობიექტის cars.json-ში დამატებისთვის
function addCar(carModel, carReleaseDate, carColor) {
    const carsFilePath = 'cars.json';
    let cars = [];

    if (fs.existsSync(carsFilePath)) {
        cars = JSON.parse(fs.readFileSync(carsFilePath));
    }

    const newCar = {
        id: cars.length + 1,
        carModel,
        carReleaseDate,
        carColor
    };

    cars.push(newCar);
    fs.writeFileSync(carsFilePath, JSON.stringify(cars, null, 2));
    console.log('მანქანა დამატებულია cars.json ფაილში');
}

// 3. შემთხვევითი ტექსტის ჩაწერა და ხმოვნების დათვლა
function writeRandomTextToFile() {
    const text = 'ეს არის შემთხვევითი ტექსტი, რომელიც შეიცავს სხვადასხვა ასოებსა და სიმბოლოებს.';
    fs.writeFileSync('text.txt', text);
    console.log('ტექსტი ჩაიწერა text.txt ფაილში');
}

function countVowelsInFile() {
    const data = fs.readFileSync('text.txt', 'utf8');
    const vowels = 'აეიოუAEIOU';
    let vowelCount = 0;

    for (const char of data) {
        if (vowels.includes(char)) {
            vowelCount++;
        }
    }

    console.log(`ხმოვნების რაოდენობა: ${vowelCount}`);
}

// process.argv-დან მონაცემების წამოღება
const [,, command, ...args] = process.argv;

if (command === 'fetch-users') {
    fetchAndSaveUsers();
} else if (args.length === 3) {
    addCar(command, args[0], args[1]);
} else if (command === 'write-text') {
    writeRandomTextToFile();
    countVowelsInFile();
} else {
    console.log('გთხოვთ, სწორად გამოიყენეთ ბრძანებები.');
}
