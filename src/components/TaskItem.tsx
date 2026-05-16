import React from 'react';
import { Task, ViewMode } from '../types';

interface Props {
  task: Task;
  viewMode: ViewMode;
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, viewMode, onToggleStatus, onEdit, onDelete }: Props) {
  const isComplete = task.status === 'Completed';

  const priorityColors = {
    Low: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
    High: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400',
  };

  const innerLayout = (
    <>
      <div className="flex items-start gap-3 flex-1">
        <input
          type="checkbox"
          checked={isComplete}
          onChange={() => onToggleStatus(task.id)}
          className="mt-1 h-4 w-4 rounded-sm border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
        <div className="space-y-1 min-w-0 flex-1">
          <h3 className={`font-semibold text-sm sm:text-base truncate transition-all ${isComplete ? 'line-through text-slate-400 dark:text-slate-500 opacity-70' : ''}`}>
            {task.title}
          </h3>
          <p className={`text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 ${isComplete ? 'opacity-60' : ''}`}>
            {task.description}
          </p>
        </div>
      </div>

      <div className={`flex items-center justify-between gap-4 mt-4 md:mt-0 ${viewMode === 'card' ? 'w-full pt-3 border-t border-slate-100 dark:border-slate-900/60' : ''}`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Due: {new Date(task.dueDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
            title="Edit Task"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md transition-colors"
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className={`bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs flex transition-all hover:shadow-md ${
      viewMode === 'card' ? 'flex-col justify-between' : 'flex-col md:flex-row md:items-center justify-between gap-4'
    } ${isComplete ? 'bg-slate-50/50 dark:bg-slate-950/40' : ''}`}>
      {innerLayout}
    </div>
  );
}