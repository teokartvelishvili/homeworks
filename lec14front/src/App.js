import React from 'react';
import HomePage from './components/HomePage';
import AddExpenseForm from './components/AddExpenseForm';

function App() {
  const handleAddExpense = (newExpense) => {
    // ახალი ხარჯის დამატება HomePage-ში
    console.log('New expense added:', newExpense);
  };

  return (
    <div className="App">
      <HomePage />
      <AddExpenseForm onAdd={handleAddExpense} />
    </div>
  );
}

export default App;
