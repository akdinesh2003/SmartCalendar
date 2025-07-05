export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  color?: string;
  userId: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
