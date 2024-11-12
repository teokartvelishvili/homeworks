const { Command } = require('commander');
const fs = require('fs');

const program = new Command();
const dataPath = './expenses.json';

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

// 1. დამატების ფუნქცია
program
    .command('create')
    .description('ახალი ხარჯის დამატება')
    .requiredOption('-c, --category <type>', 'კატეგორია')
    .requiredOption('-p, --price <number>', 'ფასი')
    .requiredOption('-d, --description <type>', 'აღწერა')
    .action((options) => {
        const data = readData();
        const { category, price, description } = options;

        if (price < 10) {
            console.error('ფასს მინიმალური მნიშვნელობა 10 უნდა ჰქონდეს');
            process.exit(1);
        }

        const newExpense = {
            id: data.length + 1,
            category,
            price: parseFloat(price),
            description,
            date: new Date().toISOString()
        };

        data.push(newExpense);
        writeData(data);
        console.log('ხარჯი დამატებულია:', newExpense);
    });

// 2. ხარჯების ჩვენება
program
    .command('show')
    .description('ყველა ხარჯის ჩვენება')
    .option('--asc', 'ზრდადობით სორტირება თარიღის მიხედვით')
    .option('--desc', 'კლებადობით სორტირება თარიღის მიხედვით')
    .action((options) => {
        let data = readData();
        
        if (options.asc) {
            data.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (options.desc) {
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        console.table(data);
    });

// 3. ფასის მიხედვით სორტირება
program
    .command('price')
    .description('ხარჯების ფასის მიხედვით სორტირება')
    .option('--asc', 'ფასის მიხედვით ზრდადობით')
    .option('--desc', 'ფასის მიხედვით კლებადობით')
    .action((options) => {
        let data = readData();
        
        if (options.asc) {
            data.sort((a, b) => a.price - b.price);
        } else if (options.desc) {
            data.sort((a, b) => b.price - a.price);
        }

        console.table(data);
    });

// 4. განახლება
program
    .command('update')
    .description('ხარჯის განახლება')
    .requiredOption('-i, --id <number>', 'აიდი')
    .option('-c, --category <type>', 'კატეგორია')
    .option('-p, --price <number>', 'ფასი')
    .option('-d, --description <type>', 'აღწერა')
    .action((options) => {
        let data = readData();
        const index = data.findIndex(expense => expense.id === parseInt(options.id));

        if (index === -1) {
            console.error('ხარჯი ვერ მოიძებნა');
            process.exit(1);
        }

        if (options.price && options.price < 10) {
            console.error('ფასს მინიმალური მნიშვნელობა 10 უნდა ჰქონდეს');
            process.exit(1);
        }

        data[index] = {
            ...data[index],
            category: options.category || data[index].category,
            price: options.price ? parseFloat(options.price) : data[index].price,
            description: options.description || data[index].description,
            date: new Date().toISOString()  // განახლების დრო
        };

        writeData(data);
        console.log('ხარჯი განახლებულია:', data[index]);
    });

// 5. წაშლა
program
    .command('delete')
    .description('ხარჯის წაშლა')
    .requiredOption('-i, --id <number>', 'აიდი')
    .action((options) => {
        let data = readData();
        const newData = data.filter(expense => expense.id !== parseInt(options.id));

        if (newData.length === data.length) {
            console.error('ხარჯი ვერ მოიძებნა');
            process.exit(1);
        }

        writeData(newData);
        console.log(`ხარჯი ID ${options.id} წაშლილია`);
    });

program.parse(process.argv);
