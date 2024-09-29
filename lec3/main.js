// 1) Check if any number in the array is divisible
//  by 5 and if true, find its index e.g: [3, 6, 10, 12] → 2
const arr1 = [3, 6, 10, 12];
const divisibleBy5Index = arr1.findIndex(num => num % 5 === 0);
console.log(divisibleBy5Index);


// 2) Filter out negative numbers from a nested array e.g: 
// [[1, -2], [3, -4], [5]] → [1, 3, 5]
const arr2 = [[1, -2], [3, -4], [5]];
const filteredPositive = arr2.flat().filter(num => num >= 0);
console.log(filteredPositive);


// 3) Filter out non-array elements and then check
//  if the remaining elements are arrays e.g: 
// [1, [2, 3], "hello", [4]] → true for remaining arrays
const arr3 = [1, [2, 3], "hello", [4]];
const onlyArrays = arr3.filter(item => Array.isArray(item));
const areAllArrays = onlyArrays.every(item => Array.isArray(item));
console.log(areAllArrays); 


// 4) Flatten a nested array and find the
//  sum of all elements e.g: [[2, 4], [6, 8]] → 20
const arr4 = [[2, 4], [6, 8]];
const sum = arr4.flat().reduce((acc, num) => acc + num, 0);
console.log(sum); 


// 5) Flatten a nested array, then square each number,
//  and calculate sum the squares
const arr5 = [[2, 4], [6, 8]];
const sumOfSquares = arr5.flat().reduce((acc, num) => acc + num ** 2, 0);
console.log(sumOfSquares); 



// 6) 
const characters = [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      eye_color: "blue",
      gender: "male",
    },
    {
      name: "Darth Vader",
      height: "202",
      mass: "136",
      eye_color: "yellow",
      gender: "male",
    },
    {
      name: "Leia Organa",
      height: "150",
      mass: "49",
      eye_color: "brown",
      gender: "female",
    },
    {
      name: "Anakin Skywalker",
      height: "188",
      mass: "84",
      eye_color: "blue",
      gender: "male",
    },
  ];
//   Get the total number of characters by eye color (hint. a map of eye color to count)
//   e.g: {
//   brown: 1,
//   yellow: 1,
//   blue: 2
//   }

  const eyeColorCount = characters.reduce((acc, character) => {
    const color = character.eye_color;
    if (acc[color]) {
      acc[color]++;
    } else {
      acc[color] = 1;
    }
    return acc;
  }, {});
  
  console.log(eyeColorCount); 
  