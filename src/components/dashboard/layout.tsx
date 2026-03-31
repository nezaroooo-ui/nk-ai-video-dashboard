'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  FileText, 
  Settings,
  Activity,
  Bell,
  MessageSquare,
  Home,
  Moon,
  Sun,
  Zap,
  Search,
  Filter,
  Plus,
  Download,
  Save,
  RefreshCw,
  ExternalLink,
  Send,
  Play,
  Pause,
  Settings as SettingsIcon,
  User,
  Shield,
  Link2,
  Bell as BellIcon,
  Calendar,
  Mail,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  XCircle,
  Target,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Force dark mode
const FORCE_DARK = true;

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(FORCE_DARK);

  useEffect(() => {
    setDarkMode(FORCE_DARK);
    if (FORCE_DARK) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Agents', href: '/agents', icon: Users },
    { name: 'Templates', href: '/templates', icon: MessageSquare },
    { name: 'Pipeline', href: '/pipeline', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const agentStatus = [
    { name: 'Kareem', status: 'active', color: 'bg-green-500' },
    { name: 'Mazen', status: 'idle', color: 'bg-gray-500' },
    { name: 'Layan', status: 'idle', color: 'bg-gray-500' },
    { name: 'Sara', status: 'idle', color: 'bg-gray-500' },
    { name: 'Hala', status: 'idle', color: 'bg-gray-500' },
    { name: 'Saleem', status: 'active', color: 'bg-green-500' },
  ];

  // Colors for dark mode - high contrast
  const colors = {
    bg: 'bg-gray-950',
    card: 'bg-gray-900',
    cardBorder: 'border-gray-800',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    accent: 'text-blue-400',
    accentBg: 'bg-blue-600',
    hover: 'hover:bg-gray-800',
    border: 'border-gray-800',
  };

  return (
    <div className={cn('min-h-screen transition-colors duration-200', FORCE_DARK ? 'bg-gray-950' : 'bg-gray-100')}>
      {/* Top Header */}
      <header className={cn('border-b sticky top-0 z-50 transition-colors duration-200', FORCE_DARK ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200')}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Logo - Click to go home */}
              <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className={cn('text-lg font-bold transition-colors', FORCE_DARK ? 'text-white group-hover:text-blue-400' : 'text-gray-900')}>Outbound System</span>
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm" style={{ color: '#9ca3af' }}>
                <span>•</span>
                <span style={{ color: '#e5e7eb' }}>Nezar Kamel</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={cn('p-2 rounded-lg transition-colors', FORCE_DARK ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600')}
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {/* Agent Status */}
              <div className="hidden lg:flex items-center gap-2">
                {agentStatus.slice(0, 5).map((agent) => (
                  <div 
                    key={agent.name}
                    className={cn('flex items-center gap-1.5 px-2 py-1 rounded-full text-xs', FORCE_DARK ? 'bg-gray-800' : 'bg-gray-100')}
                    title={`${agent.name}: ${agent.status}`}
                  >
                    <div className={cn('w-2 h-2 rounded-full', agent.color)} />
                    <span style={{ color: '#d1d5db' }}>{agent.name}</span>
                  </div>
                ))}
                {agentStatus.length > 5 && (
                  <span className="text-xs" style={{ color: '#6b7280' }}>+{agentStatus.length - 5}</span>
                )}
              </div>
              
              {/* Notifications */}
              <button className={cn('relative p-2 rounded-lg transition-colors', FORCE_DARK ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-500')}>
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
          <div className={cn('flex-1 flex flex-col min-h-0 border-r transition-colors duration-200', FORCE_DARK ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200')}>
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : FORCE_DARK 
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <item.icon className={cn('w-5 h-5', isActive ? 'text-white' : FORCE_DARK ? 'text-gray-400' : 'text-gray-400')} />
                    {item.name}
                  </button>
                );
              })}
            </nav>
            
            {/* System Status */}
            <div className={cn('px-4 py-4 border-t transition-colors duration-200', FORCE_DARK ? 'border-gray-800' : 'border-gray-200')}>
              <div className="text-xs font-medium mb-3" style={{ color: '#9ca3af' }}>System Health</div>
              <div className="space-y-2">
                {['Sheets', 'Gmail', 'Telegram', 'Database'].map((system) => (
                  <div key={system} className="flex items-center justify-between text-sm">
                    <span style={{ color: '#d1d5db' }}>{system}</span>
                    <span className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span style={{ color: '#22c55e' }}>Healthy</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className={cn('min-h-screen transition-colors duration-200', FORCE_DARK ? 'bg-gray-950' : 'bg-gray-100')}>
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              {/* Force dark mode text colors on all content */}
              <div className="[&_*]:!text-white [&_*]:!text-gray-100 [&_*]:!text-gray-200 [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-gray-300 [&_span]:!text-gray-300 [&_a]:!text-blue-400">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Export icons for use in pages
export { 
  Users, Search, Target, MessageSquare, CheckCircle, Send, BarChart3, Settings, 
  Activity, Clock, Play, Pause, RefreshCw, ExternalLink, Mail, TrendingUp, Zap,
  Filter, Plus, Download, Save, User, Shield, Link2, Bell as BellIcon, Calendar,
  ChevronRight, XCircle
};