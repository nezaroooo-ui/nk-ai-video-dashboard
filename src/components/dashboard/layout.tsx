'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  FileText, 
  Settings,
  Activity,
  AlertCircle,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Pipeline', href: '/pipeline', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const agentStatus = [
  { name: 'Kareem', status: 'active', color: 'bg-green-500' },
  { name: 'Mazen', status: 'idle', color: 'bg-gray-400' },
  { name: 'Layan', status: 'idle', color: 'bg-gray-400' },
  { name: 'Sara', status: 'idle', color: 'bg-gray-400' },
  { name: 'Hala', status: 'idle', color: 'bg-gray-400' },
  { name: 'Adham', status: 'idle', color: 'bg-gray-400' },
  { name: 'Reem', status: 'idle', color: 'bg-gray-400' },
  { name: 'Hani', status: 'idle', color: 'bg-gray-400' },
  { name: 'Nader', status: 'idle', color: 'bg-gray-400' },
  { name: 'Saleem', status: 'active', color: 'bg-green-500' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">Outbound System</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <span>•</span>
                <span>Nezar Kamel</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Agent Status */}
              <div className="hidden lg:flex items-center gap-2">
                {agentStatus.slice(0, 5).map((agent) => (
                  <div 
                    key={agent.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100 text-xs"
                    title={`${agent.name}: ${agent.status}`}
                  >
                    <div className={cn('w-2 h-2 rounded-full', agent.color)} />
                    <span className="text-gray-600">{agent.name}</span>
                  </div>
                ))}
                {agentStatus.length > 5 && (
                  <span className="text-xs text-gray-400">+{agentStatus.length - 5}</span>
                )}
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <item.icon className={cn('w-5 h-5', isActive ? 'text-blue-700' : 'text-gray-400')} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            {/* System Status */}
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="text-xs font-medium text-gray-500 mb-3">System Health</div>
              <div className="space-y-2">
                {['Sheets', 'Gmail', 'Telegram', 'Database'].map((system) => (
                  <div key={system} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{system}</span>
                    <span className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-green-600 text-xs">Healthy</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}