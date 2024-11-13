const express = require('express');
const { getExpenses, createExpense, deleteExpense, updateExpense } = require('../controllers/expensesController');
const router = express.Router();

router.get('/', getExpenses);           // ხარჯების ჩამონათვალი (პაგინაციით)
router.post('/', createExpense);        // ხარჯის დამატება
router.delete('/:id', deleteExpense);   // ხარჯის წაშლა
router.put('/:id', updateExpense);      // ხარჯის განახლება

module.exports = router;

