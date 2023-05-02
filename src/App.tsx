import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingListApp from './components/shoppingList';

function App() {
  const initialItems = [
    { name: 'Banana', quantity: 15 },
    { name: 'Egg', quantity: 13 },
    { name: 'Apple', quantity: 13 },
  ];

  return (
    <div>
      <ShoppingListApp initialItems={initialItems} />
    </div>
  );
}

export default App;
