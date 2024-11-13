const express = require('express');
const cors = require('cors');
const expensesRoutes = require('./routes/expenses');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ხარჯების CRUD როუტების ჩართვა
app.use('/expenses', expensesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
