import React, { useState } from 'react';
import axios from 'axios';

function AddExpensePage() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    axios.post('http://localhost:3000/expenses', {
      description,
      amount: Number(amount)
    })
    .then(() => window.location = '/')
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      <div className="bg-white shadow rounded-lg p-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button onClick={addExpense} className="bg-blue-500 text-white p-2 rounded">Add</button>
      </div>
    </div>
  );
}

export default AddExpensePage;
