// დავალება 1: 1) Write a function that receives 3 parameters:
// amount of money, dayLimit and weekLimit you should calculate
// how many days does it needs to withdway whole amount of money.
function calculateDaysToWithdraw(amount, dayLimit, weekLimit) {
    let days = 0;
    let weeklyWithdrawn = 0;

    while (amount > 0) {
        if (weeklyWithdrawn + dayLimit > weekLimit) {
            weeklyWithdrawn = 0;
        }
        let withdraw = Math.min(dayLimit, amount);
        if (weeklyWithdrawn + withdraw <= weekLimit) {
            amount -= withdraw;
            weeklyWithdrawn += withdraw;
            days++;
        } else {
            weeklyWithdrawn = 0;
        }
    }

    console.log(`საჭიროა ${days} დღე.`);
}

// დავალება 2: 2) Write a function that takes text as a parameter,
//the text should be: "What is a plus b?" or "What is a minus b?"
//you should write correct answer, if answer is correct console
//you're humar other wise consoled you're robot
function checkMathAnswer(text) {
    const words = text.split(' ');
    const a = parseInt(words[2]);
    const b = parseInt(words[4]);
    let answer;

    if (words[3] === 'plus') {
        answer = a + b;
    } else if (words[3] === 'minus') {
        answer = a - b;
    } else {
        console.log("არასწორი ფორმატი");
        return;
    }

    const userAnswer = parseInt(prompt('შეიყვანეთ პასუხი:'));
    if (userAnswer === answer) {
        console.log("თქვენ ხართ ადამიანი!");
    } else {
        console.log("თქვენ ხართ რობოტი!");
    }
}

//  დავალება 3: write a function that takes 2 parameter
//   the height and width you draw that rectangle with #
// eg: 2, 2 => 
//     ##
//     ##
    
//     eg: 3:4
//     ####
//     ####
//     ####
    
function drawRectangle(height, width) {
    for (let i = 0; i < height; i++) {
        let row = '';
        for (let j = 0; j < width; j++) {
            row += '#';
        }
        console.log(row);
    }
}

// დავალება 4: write a function that takes number as a 
//parameter and check is this number wide or not. * wide means
//that If the number of its digits is greater than the sum 
//of the digits.
function isWideNumber(number) {
    const numStr = number.toString();
    const digitCount = numStr.length;
    const digitSum = numStr.split('').reduce((sum, digit) => sum + parseInt(digit), 0);

    if (digitCount > digitSum) {
        console.log("რიცხვი ფართოა");
    } else {
        console.log("რიცხვი არ არის ფართო");
    }
}
