const { Command } = require('commander');
const fetch = require('node-fetch');

const program = new Command();
const API_KEY = '895284fb2d2c50a520ea537456963d9c';

program
    .command('weather <city>')
    .description('გაარკვიე ამინდი მოცემულ ქალაქში')
    .action(async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
            const data = await response.json();

            if (data.cod !== 200) {
                console.error('შეცდომა:', data.message);
                return;
            }

            console.log(`ქალაქი: ${data.name}`);
            console.log(`ტემპერატურა: ${data.main.temp}°C`);
        } catch (error) {
            console.error('შეცდომა:', error.message);
        }
    });

program.parse(process.argv);
