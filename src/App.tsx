import React, { useState } from 'react';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import { Event, Task } from './types/calendar';
import './styles/global.css';

function App() {
  const [events, setEvents] = useState<Event[]>([
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
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review Code',
      description: 'Review the latest pull requests',
      dueDate: new Date(2024, 0, 18),
      priority: 'high',
      status: 'todo',
      userId: '1'
    },
    {
      id: '2',
      title: 'Update Documentation',
      description: 'Update API documentation',
      dueDate: new Date(2024, 0, 22),
      priority: 'medium',
      status: 'in-progress',
      userId: '1'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks'>('calendar');

  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Smart Calendar</h1>
          <p>Your intelligent scheduling companion</p>
        </div>

        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            �� Calendar
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            ✅ Tasks
          </button>
        </div>

        {activeTab === 'calendar' && (
          <Calendar events={events} onAddEvent={handleAddEvent} />
        )}

        {activeTab === 'tasks' && (
          <TaskList 
            tasks={tasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
