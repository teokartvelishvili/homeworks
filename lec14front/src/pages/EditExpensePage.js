import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditExpensePage() {
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/expenses/${id}`)
      .then(response => {
        setDescription(response.data.description);
        setAmount(response.data.amount);
      })
      .catch(error => console.error(error));
  }, [id]);

  const updateExpense = () => {
    axios.put(`http://localhost:3000/expenses/${id}`, {
      description,
      amount: Number(amount)
    })
    .then(() => window.location = '/')
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Expense</h1>
      <div className="bg-white shadow rounded-lg p-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button onClick={updateExpense} className="bg-green-500 text-white p-2 rounded">Update</button>
      </div>
    </div>
  );
}

export default EditExpensePage;
