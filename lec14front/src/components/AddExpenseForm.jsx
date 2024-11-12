import React, { useState } from 'react';
import axios from 'axios';

const AddExpenseForm = ({ onAdd }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !description || !date) {
      setError('All fields are required');
      return;
    }

    axios.post('http://localhost:3000/expenses', { amount, description, date })
      .then((response) => {
        onAdd(response.data.data);  // ახალი ხარჯის დამატება
        setAmount('');
        setDescription('');
        setDate('');
        setError('');
      })
      .catch((err) => {
        setError('Error adding expense');
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
