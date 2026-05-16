import React from 'react';
import { TaskFiltersState, ViewMode } from '../types';

interface Props {
  filters: TaskFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<TaskFiltersState>>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export default function TaskFilters({ filters, setFilters, viewMode, setViewMode }: Props) {
  return (
    <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
      <div className="w-full md:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Search title or details..."
          value={filters.search}
          onChange={e => setFilters(p => ({ ...p, search: e.target.value }))}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filters.status}
          onChange={e => setFilters(p => ({ ...p, status: e.target.value as any }))}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={e => setFilters(p => ({ ...p, priority: e.target.value as any }))}
          className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 w-full md:w-auto justify-center">
        <button
          onClick={() => setViewMode('list')}
          className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 shadow-xs text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
        >
          List
        </button>
        <button
          onClick={() => setViewMode('card')}
          className={`flex-1 md:flex-none px-4 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'card' ? 'bg-white dark:bg-slate-800 shadow-xs text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
        >
          Card
        </button>
      </div>
    </div>
  );
}