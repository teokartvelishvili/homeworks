import React, { useState } from 'react';
import axios from 'axios';

const ExpenseItem = ({ expense, onDelete, onEdit, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(expense.amount);
  const [description, setDescription] = useState(expense.description);
  const [date, setDate] = useState(expense.date);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/expenses/${expense.id}`, {
      headers: { 'api-key': 'authorized-key' }
    })
    .then(() => {
      onDelete(expense.id);
    })
    .catch((err) => {
      alert('Error deleting expense');
    });
  };

  const handleSave = () => {
    const updatedExpense = { amount, description, date };

    axios.put(`http://localhost:3000/expenses/${expense.id}`, updatedExpense)
      .then((response) => {
        onEdit(response.data.data);
        setIsEditing(false);
      })
      .catch((err) => {
        alert('Error updating expense');
      });
  };

  return (
    <li className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm mb-4">
      <div className="flex-1">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <>
            <h3 className="font-bold">{expense.description}</h3>
            <p className="text-gray-600">Amount: ${expense.amount}</p>
            <p className="text-gray-500">Date: {expense.date}</p>
          </>
        )}
      </div>

      {/* Edit and Delete buttons only visible in admin mode */}
      {isAdmin && (
        <div className="flex space-x-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-2 rounded-md text-sm w-20 transition-colors duration-200 hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-yellow-500 text-white p-2 rounded-md text-sm w-20 transition-colors duration-200 hover:bg-yellow-600"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-md text-sm w-20 transition-colors duration-200 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default ExpenseItem;
