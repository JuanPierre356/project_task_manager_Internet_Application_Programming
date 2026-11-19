import React, { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // evita que a página recarregue ao submeter
    addTask(inputValue);
    setInputValue(''); // limpa o campo
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
      <input 
        type="text" 
        placeholder="Enter a new task" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
        style={{ flexGrow: 1 }}/>
      <button type="submit">Add Task</button>
    </form>
  );
}