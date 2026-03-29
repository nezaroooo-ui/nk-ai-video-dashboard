import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon,
  variant = 'default' 
}: KPICardProps) {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200',
  };

  const iconStyles = {
    default: 'text-gray-400 bg-gray-100',
    success: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    danger: 'text-red-600 bg-red-100',
  };

  const valueStyles = {
    default: 'text-gray-900',
    success: 'text-green-700',
    warning: 'text-yellow-700',
    danger: 'text-red-700',
  };

  return (
    <div className={cn('rounded-xl border p-6', variantStyles[variant])}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={cn('mt-2 text-3xl font-semibold', valueStyles[variant])}>
            {value}
          </p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              <span className={cn(
                'text-sm font-medium',
                change >= 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-gray-500">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', iconStyles[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}