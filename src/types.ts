export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'Completed';
export type ViewMode = 'list' | 'grid'| 'card';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
}

export interface TaskFiltersState {
  search: string;
  status: 'All' | TaskStatus;
  priority: 'All' | Priority;
}