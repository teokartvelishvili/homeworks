const expenses = [];

exports.getExpenses = (req, res) => {
  res.json(expenses);
};

exports.getExpenseById = (req, res, next) => {
  const expense = expenses.find((e) => e.id === parseInt(req.params.id));
  if (!expense) return next({ status: 404, message: 'Expense not found' });
  res.json(expense);
};

exports.addExpense = (req, res) => {
  const { amount, description, date } = req.body;
  const newExpense = { id: expenses.length + 1, amount, description, date };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
};

exports.deleteExpense = (req, res) => {
  const expenseIndex = expenses.findIndex((e) => e.id === parseInt(req.params.id));
  if (expenseIndex === -1) return res.status(404).json({ error: 'Expense not found' });
  expenses.splice(expenseIndex, 1);
  res.status(204).send();
};
