'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Target, 
  MessageSquare, 
  CheckCircle, 
  Send, 
  BarChart3,
  Settings,
  Activity,
  Clock,
  Play,
  Pause,
  RefreshCw,
  ExternalLink,
  Mail,
  TrendingUp,
  Zap,
  Eye
} from 'lucide-react';
import { DashboardLayout, designTokens } from '@/components/dashboard/layout';
import { cn, formatDate } from '@/lib/utils';

// Use design tokens
const t = designTokens;
const FORCE_DARK = true;

const schedule = [
  { time: '8:00 AM', agent: 'Kareem', task: 'Morning brief & daily planning', status: 'completed' },
  { time: '8:15 AM', agent: 'Mazen', task: 'Research cycle - Find new leads', status: 'pending' },
  { time: '9:00 AM', agent: 'Saleem', task: 'Technical health check', status: 'completed' },
  { time: '11:00 AM', agent: 'Layan', task: 'Enrichment review', status: 'pending' },
  { time: '12:00 PM', agent: 'Yara', task: 'Messaging strategy', status: 'pending' },
  { time: '1:00 PM', agent: 'Sara', task: 'Copy drafting', status: 'pending' },
  { time: '3:00 PM', agent: 'Hala', task: 'QA review', status: 'pending' },
  { time: '4:30 PM', agent: 'Adham', task: 'Send approved outreach', status: 'pending' },
  { time: '5:00 PM', agent: 'Reem', task: 'Pipeline update', status: 'pending' },
  { time: '5:30 PM', agent: 'Hani', task: 'Reply handling', status: 'pending' },
  { time: '6:00 PM', agent: 'Nader', task: 'Dashboard refresh', status: 'pending' },
  { time: '7:00 PM', agent: 'Kareem', task: 'Final metrics collection', status: 'pending' },
  { time: '7:30 PM', agent: 'Kareem', task: 'Executive summary to founder', status: 'pending' },
];

export default function HomePage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'failed':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">مرحباً بك في نظام outreach</h1>
          <p className="text-blue-100">نظام التشغيل الآلي للعملاء المحتملين - مدعوم بالذكاء الاصطناعي</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Leads */}
          <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-6')}>
            <div className="flex items-center justify-between mb-4">
              <div className={cn(t.bgTertiary, 'p-2 rounded-lg')}>
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs text-green-400">+12%</span>
            </div>
            <p className={cn('text-3xl font-bold', t.textPrimary)}>{stats?.stats?.totalLeads || 0}</p>
            <p className={cn('text-sm mt-1', t.textMuted)}>إجمالي الليدز</p>
          </div>

          {/* Sent */}
          <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-6')}>
            <div className="flex items-center justify-between mb-4">
              <div className={cn(t.bgTertiary, 'p-2 rounded-lg')}>
                <Send className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className={cn('text-3xl font-bold', t.textPrimary)}>{stats?.stats?.pipeline?.sent || 0}</p>
            <p className={cn('text-sm mt-1', t.textMuted)}>تم الإرسال</p>
          </div>

          {/* Replied */}
          <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-6')}>
            <div className="flex items-center justify-between mb-4">
              <div className={cn(t.bgTertiary, 'p-2 rounded-lg')}>
                <MessageSquare className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <p className={cn('text-3xl font-bold', t.textPrimary)}>{stats?.stats?.pipeline?.replied || 0}</p>
            <p className={cn('text-sm mt-1', t.textMuted)}>ردود مستلمة</p>
          </div>

          {/* Interested */}
          <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-6')}>
            <div className="flex items-center justify-between mb-4">
              <div className={cn(t.bgTertiary, 'p-2 rounded-lg')}>
                <Target className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className={cn('text-3xl font-bold', t.textPrimary)}>{stats?.stats?.pipeline?.interested || 0}</p>
            <p className={cn('text-sm mt-1', t.textMuted)}>مهتمين</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault)}>
              <div className={cn('px-6 py-4 border-b', t.borderDefault)}>
                <h2 className={cn('text-lg font-semibold', t.textPrimary)}>جدول اليوم</h2>
              </div>
              <div className="divide-y divide-gray-800">
                {schedule.map((item, idx) => (
                  <div key={idx} className="px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={cn('text-sm font-medium w-16', t.textMuted)}>{item.time}</span>
                      <div>
                        <p className={cn('text-sm font-medium', t.textSecondary)}>{item.task}</p>
                        <p className={cn('text-xs', t.textMuted)}>{item.agent}</p>
                      </div>
                    </div>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(item.status))}>
                      {item.status === 'completed' ? 'مكتمل' : item.status === 'pending' ? 'معلق' : 'فشل'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Start Research */}
            <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-6')}>
              <h3 className={cn('font-semibold mb-4', t.textPrimary)}>بدء مهمة البحث</h3>
              <button className={cn('w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors', t.accentBg, 'text-white', t.accentHover)}>
                <Play className="w-4 h-4" />
                بدء البحث
              </button>
            </div>

            {/* System Status */}
            <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-6')}>
              <h3 className={cn('font-semibold mb-4', t.textPrimary)}>حالة النظام</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={t.textSecondary}>Google Sheets</span>
                  <span className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-400 text-sm">متصل</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={t.textSecondary}>Telegram</span>
                  <span className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-400 text-sm">متصل</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={t.textSecondary}>Database</span>
                  <span className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-400 text-sm">متصل</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}