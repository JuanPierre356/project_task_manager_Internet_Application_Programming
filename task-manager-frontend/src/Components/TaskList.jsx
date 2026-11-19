import React from 'react';

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No tasks found.</p>;
  }

  return (
    <ul className="simple-list">
      {tasks.map((task) => (
        <li key={task.id} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => toggleTask(task.id)}
            style={{ marginRight: '15px', transform: 'scale(1.3)', cursor: 'pointer' }}
          />
          
          <span style={{ 
            textDecoration: task.completed ? 'line-through' : 'none', 
            flexGrow: 1, 
            color: task.completed ? '#a0a0a0' : '#333',
            fontSize: '1.05rem'
          }}>
            {task.title}
          </span>

          <button 
            onClick={() => deleteTask(task.id)} 
            style={{ backgroundColor: '#e53935', padding: '8px 12px', fontSize: '0.85rem' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}