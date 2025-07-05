import React, { useState } from 'react';
import { Task } from '../types/calendar';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    dueDate: new Date().toISOString().slice(0, 10)
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      onAddTask({
        title: newTask.title,
        description: newTask.description,
        dueDate: new Date(newTask.dueDate),
        priority: newTask.priority,
        status: 'todo',
        userId: '1'
      });
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: new Date().toISOString().slice(0, 10) });
      setIsAdding(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#fd7e14';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in-progress': return '#007bff';
      case 'todo': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const filteredTasks = {
    todo: tasks.filter(task => task.status === 'todo'),
    inProgress: tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed')
  };

  return (
    <div className="task-list-container">
      <div className="task-header">
        <h3>Task Management</h3>
        <button 
          className="add-task-btn"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="add-task-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <textarea
            placeholder="Task description (optional)"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            rows={2}
          />
          <div className="form-row">
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <button type="submit" className="save-task-btn">Save Task</button>
          </div>
        </form>
      )}

      <div className="task-columns">
        <div className="task-column">
          <h4>To Do ({filteredTasks.todo.length})</h4>
          <div className="task-items">
            {filteredTasks.todo.map(task => (
              <div key={task.id} className="task-item" style={{ borderLeftColor: getPriorityColor(task.priority) }}>
                <div className="task-header-row">
                  <h5>{task.title}</h5>
                  <div className="task-actions">
                    <button
                      onClick={() => onUpdateTask(task.id, { status: 'in-progress' })}
                      className="action-btn"
                      title="Start Task"
                    >
                      ▶
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="action-btn delete"
                      title="Delete Task"
                    >
                      ×
                    </button>
                  </div>
                </div>
                {task.description && <p>{task.description}</p>}
                <div className="task-meta">
                  <span className="priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                    {task.priority}
                  </span>
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="task-column">
          <h4>In Progress ({filteredTasks.inProgress.length})</h4>
          <div className="task-items">
            {filteredTasks.inProgress.map(task => (
              <div key={task.id} className="task-item" style={{ borderLeftColor: getPriorityColor(task.priority) }}>
                <div className="task-header-row">
                  <h5>{task.title}</h5>
                  <div className="task-actions">
                    <button
                      onClick={() => onUpdateTask(task.id, { status: 'completed' })}
                      className="action-btn"
                      title="Complete Task"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => onUpdateTask(task.id, { status: 'todo' })}
                      className="action-btn"
                      title="Move Back"
                    >
                      ←
                    </button>
                  </div>
                </div>
                {task.description && <p>{task.description}</p>}
                <div className="task-meta">
                  <span className="priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                    {task.priority}
                  </span>
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="task-column">
          <h4>Completed ({filteredTasks.completed.length})</h4>
          <div className="task-items">
            {filteredTasks.completed.map(task => (
              <div key={task.id} className="task-item completed" style={{ borderLeftColor: getPriorityColor(task.priority) }}>
                <div className="task-header-row">
                  <h5>{task.title}</h5>
                  <div className="task-actions">
                    <button
                      onClick={() => onUpdateTask(task.id, { status: 'in-progress' })}
                      className="action-btn"
                      title="Reopen Task"
                    >
                      ↺
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="action-btn delete"
                      title="Delete Task"
                    >
                      ×
                    </button>
                  </div>
                </div>
                {task.description && <p>{task.description}</p>}
                <div className="task-meta">
                  <span className="status completed">Completed</span>
                  <span className="due-date">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
