const fs = require('fs');
const filePath = './data/expenses.json';

exports.getExpenses = (req, res) => {
    let { page = 1, limit = 5 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file', data: null });
        }
        const expenses = JSON.parse(data || '[]');
        const totalExpenses = expenses.length;
        const totalPages = Math.ceil(totalExpenses / limit); // გამოთვლის სულ რამდენი გვერდია

        const paginatedExpenses = expenses.slice((page - 1) * limit, page * limit);
        res.json({
            message: 'Success',
            data: paginatedExpenses,
            totalPages, // გვერდების საერთო რაოდენობა
            currentPage: page // ამჟამინდელი გვერდი
        });
    });
};
