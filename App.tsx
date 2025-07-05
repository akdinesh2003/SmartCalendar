import React from 'react';
import Calendar from './components/Calendar';
import './styles/global.css';

function App() {
  const sampleEvents = [
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      color: '#007bff',
      userId: '1'
    },
    {
      id: '2',
      title: 'Project Deadline',
      start: new Date(2024, 0, 20, 14, 0),
      end: new Date(2024, 0, 20, 16, 0),
      color: '#dc3545',
      userId: '1'
    }
  ];

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Smart Calendar</h1>
          <p>Your intelligent scheduling companion</p>
        </div>
        <Calendar events={sampleEvents} />
      </div>
    </div>
  );
}

export default App;