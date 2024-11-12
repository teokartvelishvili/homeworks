const { Command } = require('commander');
const fs = require('fs');

const program = new Command();
const dataPath = './cars.json';

// მონაცემების წაკითხვის ფუნქცია
function readData() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(dataPath));
}

// მონაცემების ჩაწერის ფუნქცია
function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// მანქანის დამატება
program
    .command('add')
    .description('ახალი მანქანის დამატება')
    .requiredOption('-n, --name <type>', 'მანქანის სახელი')
    .requiredOption('-p, --price <number>', 'ფასი')
    .requiredOption('-c, --color <type>', 'ფერი')
    .action((options) => {
        const data = readData();
        const { name, price, color } = options;

        const newCar = {
            id: data.length + 1,
            name,
            price: parseFloat(price),
            color
        };

        data.push(newCar);
        writeData(data);
        console.log('მანქანა დამატებულია:', newCar);
    });

// მანქანების ჩვენება
program
    .command('show')
    .description('ყველა მანქანის ჩვენება')
    .action(() => {
        const data = readData();
        console.table(data);
    });

// მანქანის წაშლა
program
    .command('delete')
    .description('მანქანის წაშლა')
    .requiredOption('-i, --id <number>', 'აიდი')
    .action((options) => {
        let data = readData();
        const newData = data.filter(car => car.id !== parseInt(options.id));

        if (newData.length === data.length) {
            console.error('მანქანა ვერ მოიძებნა');
            process.exit(1);
        }

        writeData(newData);
        console.log(`მანქანა ID ${options.id} წაშლილია`);
    });

// მანქანის განახლება
program
    .command('update')
    .description('მანქანის განახლება')
    .requiredOption('-i, --id <number>', 'აიდი')
    .option('-n, --name <type>', 'სახელი')
    .option('-p, --price <number>', 'ფასი')
    .option('-c, --color <type>', 'ფერი')
    .action((options) => {
        let data = readData();
        const index = data.findIndex(car => car.id === parseInt(options.id));

        if (index === -1) {
            console.error('მანქანა ვერ მოიძებნა');
            process.exit(1);
        }

        data[index] = {
            ...data[index],
            name: options.name || data[index].name,
            price: options.price ? parseFloat(options.price) : data[index].price,
            color: options.color || data[index].color
        };

        writeData(data);
        console.log('მანქანა განახლებულია:', data[index]);
    });

// მანქანის მოძიება ID-ით
program
    .command('get')
    .description('მანქანის მოძიება ID-ით')
    .requiredOption('-i, --id <number>', 'აიდი')
    .action((options) => {
        const data = readData();
        const car = data.find(car => car.id === parseInt(options.id));

        if (!car) {
            console.error('მანქანა ვერ მოიძებნა');
            process.exit(1);
        }

        console.log('ნაპოვნი მანქანა:', car);
    });

program.parse(process.argv);
