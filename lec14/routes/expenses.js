const express = require('express');
const {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
} = require('../services/expenseService');
const deleteMiddleware = require('../middlewares/deleteMiddleware');
const validateExpenseMiddleware = require('../middlewares/validateExpenseMiddleware');
const randomMiddleware = require('../middlewares/randomMiddleware');

const router = express.Router();

// ყველა ხარჯის გამოტანა
router.get('/', getExpenses);

// კონკრეტული ხარჯის გამოტანა ID-ს მიხედვით
router.get('/:id', getExpenseById);

// ხარჯის დამატება ვალიდაციის შემოწმებით
router.post('/', validateExpenseMiddleware, addExpense);

// ხარჯის წაშლა Middleware-ის შემოწმებით
router.delete('/:id', deleteMiddleware, deleteExpense);

// Random Middleware ტესტისთვის
router.get('/random', randomMiddleware, (req, res) => {
  res.send('Request passed through random middleware');
});

module.exports = router;
