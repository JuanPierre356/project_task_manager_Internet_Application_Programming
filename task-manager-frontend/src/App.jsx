import React, { useState, useEffect } from 'react';
import TaskForm from './Components/TaskForm';
import TaskFilter from './Components/TaskFilter';
import TaskList from './Components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  // Carrega as tarefas ao abrir
  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erro a carregar tarefas:", error));
  }, []);

  //adiciona tarefas
  const addTask = (title) => {
    if (title.trim() === '') return;
    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false })
    })
      .then((response) => response.json())
      .then((newTask) => setTasks([...tasks, newTask]))
      .catch((error) => console.error("Erro a adicionar tarefa:", error));
  };

  //altera o estado da tarefa
  const toggleTask = (taskId) => {
    fetch(`http://localhost:8080/api/tasks/${taskId}`, {
      method: 'PUT'
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        const updatedTasks = tasks.map((task) => 
          task.id === taskId ? updatedTask : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Erro a atualizar tarefa:", error));
  };

  //apagar tarefas
  const deleteTask = (taskId) => {
    fetch(`http://localhost:8080/api/tasks/${taskId}`, {
      method: 'DELETE'
    })
    .then(() => {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    })
    .catch((error) => console.error("Erro a apagar tarefa:", error));
  }

  //filtrar as tarefas
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true; 
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      
      <main className="app-main">
        {/* Cartão para adicionar tarefa */}
        <div className="card">
          <TaskForm addTask={addTask} />
        </div>

        {/* Cartão com filtros e lista */}
        <div className="card">
          <TaskFilter filter={filter} setFilter={setFilter} />
          <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        </div>
      </main>
    </div>
  );
}

export default App;