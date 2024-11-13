import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseItem from '../components/ExpenseItem';
import AddExpenseForm from '../components/AddExpenseForm';

const AdminPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (isAuthorized) {
      setLoading(true);
      axios.get(`http://localhost:3000/expenses?page=${page}&limit=5`)
        .then((response) => {
          setExpenses(response.data.data);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching expenses');
          setLoading(false);
        });
    }
  }, [page, isAuthorized]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === '777') {
      setIsAuthorized(true);
    } else {
      alert('Incorrect PIN code');
    }
  };

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses(expenses.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp)));
  };

  if (!isAuthorized) {
    return (
      <div className="container mx-auto p-6 max-w-sm bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Access</h1>
        <form onSubmit={handlePinSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-xl bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Expenses</h1>

      <AddExpenseForm onAdd={handleAddExpense} />

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
                isAdmin={true}
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
        <span className="text-gray-700 text-sm">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : page)}
          className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-300"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
