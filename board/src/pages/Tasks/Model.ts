export interface Task {
  id: string;
  title: string;
  description: string;
  index: number;
  // status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  name: 'To do' | 'In Progress' | 'Done';
  items: Task[];
}

export interface Board {
  Column;
}
