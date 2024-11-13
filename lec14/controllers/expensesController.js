// controllers/expensesController.js
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
        const totalPages = Math.ceil(totalExpenses / limit);
        const paginatedExpenses = expenses.slice((page - 1) * limit, page * limit);
        res.json({
            message: 'Success',
            data: paginatedExpenses,
            totalPages,
            currentPage: page,
        });
    });
};

exports.createExpense = (req, res) => {
    const { amount, description, date } = req.body;
    if (!amount || !description || !date) {
        return res.status(400).json({ message: 'Amount, description and date are required', data: null });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file', data: null });
        }
        const expenses = JSON.parse(data || '[]');
        const newExpense = { id: Date.now(), amount, description, date };
        expenses.push(newExpense);

        fs.writeFile(filePath, JSON.stringify(expenses), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file', data: null });
            }
            res.status(201).json({ message: 'Expense created successfully', data: newExpense });
        });
    });
};

exports.deleteExpense = (req, res) => {
    const expenseId = Number(req.params.id);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file', data: null });
        }

        const expenses = JSON.parse(data || '[]');
        const index = expenses.findIndex(exp => exp.id === expenseId);
        if (index === -1) {
            return res.status(404).json({ message: 'Expense not found', data: null });
        }

        const deletedExpense = expenses.splice(index, 1);
        fs.writeFile(filePath, JSON.stringify(expenses), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file', data: null });
            }
            res.json({ message: 'Expense deleted successfully', data: deletedExpense });
        });
    });
};

exports.updateExpense = (req, res) => {
    const { amount, description, date } = req.body;
    const expenseId = Number(req.params.id);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading file', data: null });
        }

        const expenses = JSON.parse(data || '[]');
        const index = expenses.findIndex(exp => exp.id === expenseId);
        if (index === -1) {
            return res.status(404).json({ message: 'Expense not found', data: null });
        }

        if (amount) expenses[index].amount = amount;
        if (description) expenses[index].description = description;
        if (date) expenses[index].date = date;

        fs.writeFile(filePath, JSON.stringify(expenses), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing file', data: null });
            }
            res.json({ message: 'Expense updated successfully', data: expenses[index] });
        });
    });
};
