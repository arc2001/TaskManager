import React, { useState, useEffect } from 'react';
import { Task, TaskFiltersState, ViewMode } from './types';
import DashboardStats from './components/DashboardStats';
import TaskFilters from './components/TaskFilters';
import TaskItem from './components/TaskItem';
import TaskFormModal from './components/TaskFormModal';
import ThemeToggle from './components/ThemeToggle';

const LOCAL_STORAGE_KEY = 'dashboard_tasks_v1';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState<TaskFiltersState>({
    search: '',
    status: 'All',
    priority: 'All',
  });

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Task Actions
  const handleCreateOrUpdateTask = (taskData: Omit<Task, 'id' | 'status' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(prev =>
        prev.map(t => (t.id === editingTask.id ? { ...t, ...taskData } : t))
      );
    } else {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: t.status === 'Pending' ? 'Completed' : 'Pending' } : t
      )
    );
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Filter Logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'All' || task.status === filters.status;
    const matchesPriority = filters.priority === 'All' || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">TaskSpace</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => { setEditingTask(undefined); setIsModalOpen(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm"
            >
              + New Task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <DashboardStats tasks={tasks} />

        <TaskFilters 
          filters={filters} 
          setFilters={setFilters} 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
        />

        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            <p className="text-slate-500 dark:text-slate-400">No tasks found matching criteria.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' || viewMode === 'card' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
            : "space-y-3"
          }>
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                viewMode={viewMode}
                onToggleStatus={toggleTaskStatus}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(undefined); }}
        onSubmit={handleCreateOrUpdateTask}
        editingTask={editingTask}
      />
    </div>
  );
}