const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. ფუნქცია, რომელიც ამოწმებს ფოლდერის არსებობას
function checkFolderExists(folderName) {
    const folderPath = path.join(__dirname, folderName);
    if (fs.existsSync(folderPath)) {
        console.log(`Folder "${folderName}" exists.`);
        return true;
    } else {
        console.log(`Folder "${folderName}" does not exist.`);
        return false;
    }
}

// 2. /user-data როუტი, რომელიც data.json-ის მონაცემებს აბრუნებს
app.get('/user-data', (req, res) => {
    if (fs.existsSync('./data.json')) {
        const data = JSON.parse(fs.readFileSync('./data.json'));
        res.json(data);
    } else {
        res.status(404).send('Data file not found.');
    }
});

// 3. /random როუტი, რომელიც აბრუნებს შემთხვევით რიცხვს 1-დან 100-მდე
app.get('/random', (req, res) => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    res.send(`Random number: ${randomNum}`);
});

// 4. /html როუტი, რომელიც აბრუნებს უბრალო HTML ცხრილს
app.get('/html', (req, res) => {
    const htmlContent = `
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Teona</td>
                <td>28</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Nika</td>
                <td>25</td>
            </tr>
        </table>
    `;
    res.send(htmlContent);
});

// 5. /current-time როუტი, რომელიც აბრუნებს მიმდინარე დროს ISO ფორმატით
app.get('/current-time', (req, res) => {
    const currentTime = new Date().toISOString();
    res.send(`Current time in ISO format: ${currentTime}`);
});

// 6. /api როუტი, რომელიც აბრუნებს ობიექტების მასივს (მაგალითად, მომხმარებლები)
app.get('/api', (req, res) => {
    const apiData = [
        { id: 1, type: 'user', name: 'Tedi' },
        { id: 2, type: 'animal', name: 'Dog' },
        { id: 3, type: 'post', title: 'Hello World' }
    ];
    res.json(apiData);
});

// სერვერის გაშვება
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
