import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseItem from './ExpenseItem';

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ხარჯების ჩამოყვანა
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/expenses?page=${page}&limit=5`)
      .then((response) => {
        setExpenses(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching expenses');
        setLoading(false);
      });
  }, [page]);

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses(expenses.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp)));
  };

  return (
    <div className="container mx-auto p-6 max-w-xl bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Your Expenses</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses found.</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={handleDeleteExpense}
                onEdit={handleEditExpense}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-300"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
