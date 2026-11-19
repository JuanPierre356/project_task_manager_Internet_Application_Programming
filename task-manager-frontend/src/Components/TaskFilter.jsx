import React from 'react';

export default function TaskFilter({ filter, setFilter }) {
  return (
    <div style={{ marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'center' }}>
      <span style={{ fontWeight: '600', color: '#555', marginRight: '5px' }}>Filters: </span>
      <button onClick={() => setFilter('All')} disabled={filter === 'All'}>All</button>
      <button onClick={() => setFilter('Completed')} disabled={filter === 'Completed'}>Completed</button>
      <button onClick={() => setFilter('Incomplete')} disabled={filter === 'Incomplete'}>Incomplete</button>
    </div>
  );
}