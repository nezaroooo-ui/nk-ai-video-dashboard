import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercent(num: number): string {
  return `${num.toFixed(1)}%`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // Pipeline statuses
    new: 'bg-gray-100 text-gray-800',
    researched: 'bg-blue-100 text-blue-800',
    enriched: 'bg-indigo-100 text-indigo-800',
    ready_for_messaging: 'bg-purple-100 text-purple-800',
    ready_for_qa: 'bg-violet-100 text-violet-800',
    approved: 'bg-teal-100 text-teal-800',
    sent: 'bg-cyan-100 text-cyan-800',
    opened: 'bg-sky-100 text-sky-800',
    replied: 'bg-amber-100 text-amber-800',
    interested: 'bg-green-100 text-green-800',
    follow_up_needed: 'bg-yellow-100 text-yellow-800',
    meeting_requested: 'bg-lime-100 text-lime-800',
    proposal_sent: 'bg-emerald-100 text-emerald-800',
    won: 'bg-green-200 text-green-900',
    lost: 'bg-red-100 text-red-800',
    do_not_contact: 'bg-gray-200 text-gray-600',
    // Health statuses
    healthy: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    critical: 'bg-red-200 text-red-900',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function getTierColor(tier: string): string {
  const colors: Record<string, string> = {
    A: 'bg-red-100 text-red-800 border-red-200',
    B: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    C: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  return colors[tier] || colors.C;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}