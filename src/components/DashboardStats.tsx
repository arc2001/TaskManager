import { Task } from '../types';

export default function DashboardStats({ tasks }: { tasks: Task[] }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending = total - completed;

  const cards = [
    { label: 'Total Tasks', value: total, color: 'border-blue-500 text-blue-600 dark:text-blue-400' },
    { label: 'Pending', value: pending, color: 'border-amber-500 text-amber-600 dark:text-amber-400' },
    { label: 'Completed', value: completed, color: 'border-emerald-500 text-emerald-600 dark:text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(card => (
        <div key={card.label} className={`bg-white dark:bg-slate-950 p-6 rounded-xl border-l-4 shadow-sm border-y border-r border-slate-200 dark:border-slate-800`}>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{card.label}</p>
          <p className={`text-3xl font-bold mt-2 ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}