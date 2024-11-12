import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseItem from './ExpenseItem';

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ხარჯების ლოდინი
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Expenses</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
