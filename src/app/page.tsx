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
import { DashboardLayout } from '@/components/dashboard/layout';
import { cn, formatDate } from '@/lib/utils';

const schedule = [
  { time: '8:00 AM', agent: 'Kareem', task: 'Morning brief & daily planning', status: 'completed' },
  { time: '8:15 AM', agent: 'Mazen', task: 'Research cycle - Find new leads', status: 'pending' },
  { time: '9:00 AM', agent: 'Saleem', task: 'Technical health check', status: 'completed' },
  { time: '11:00 AM', agent: 'Layan', task: 'Enrich leads with insights', status: 'pending' },
  { time: '12:00 PM', agent: 'Yara', task: 'Messaging strategy', status: 'pending' },
  { time: '1:00 PM', agent: 'Sara', task: 'Write outreach messages', status: 'pending' },
  { time: '3:00 PM', agent: 'Hala', task: 'QA review', status: 'pending' },
  { time: '4:30 PM', agent: 'Adham', task: 'Send approved messages', status: 'pending' },
  { time: '5:00 PM', agent: 'Reem', task: 'Update pipeline', status: 'pending' },
  { time: '5:30 PM', agent: 'Hani', task: 'Handle replies', status: 'pending' },
  { time: '6:00 PM', agent: 'Nader', task: 'Dashboard refresh', status: 'pending' },
  { time: '7:00 PM', agent: 'Kareem', task: 'Collect final metrics', status: 'pending' },
  { time: '7:30 PM', agent: 'Kareem', task: 'Send evening report', status: 'pending' },
];

const founderInfo = {
  name: 'Nezar Kamel',
  website: 'https://nezarkamel.com/',
  segments: ['Beauty', 'Perfume', 'eCommerce', 'Luxury'],
  platforms: ['Instagram', 'TikTok', 'Threads'],
  service: 'AI Video Production',
};

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/dashboard/stats');
      const data = await res.json();
      setStats(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Founder Info */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Nezar</h1>
              <p className="text-blue-100 mt-1">AI Video Client Acquisition System</p>
              <div className="flex gap-4 mt-3">
                <a href={founderInfo.website} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-1 text-sm text-blue-100 hover:text-white">
                  <ExternalLink className="w-4 h-4" /> Website
                </a>
                <span className="text-blue-200">|</span>
                <span className="text-sm text-blue-100">Segments: {founderInfo.segments.join(', ')}</span>
              </div>
            </div>
            <button 
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.stats?.totalLeads || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium">From Google Sheets</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Messages Sent</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.stats?.pipeline?.sent || 0}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Send className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium">This campaign</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Replies</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.stats?.pipeline?.replied || 0}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium">Response rate: {stats?.stats?.totalLeads ? ((stats.stats.pipeline.replied / stats.stats.totalLeads) * 100).toFixed(1) : 0}%</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Interested</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.stats?.pipeline?.interested || 0}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium">Hot leads</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
              <span className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {schedule.map((item, index) => (
                <div key={index} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'w-2 h-2 rounded-full',
                      item.status === 'completed' ? 'bg-green-500' : 
                      item.status === 'running' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                    )} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.task}</p>
                      <p className="text-xs text-gray-500">{item.agent}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Start Research Task */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Start Research Task</h3>
                  <p className="text-sm text-gray-500">Find Saudi eCommerce stores on Salessa</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Target:</strong> Online stores in Saudi Arabia using سلة (Salessa) platform
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Segments:</strong> Beauty, Perfume, Fashion, Electronics
                </p>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Search className="w-4 h-4" />
                Start Mazen Research
              </button>
            </div>

            {/* Connection Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">System Status</h3>
                <span className={cn(
                  'px-2 py-1 text-xs font-medium rounded-full',
                  stats?.connected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                )}>
                  {stats?.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Google Sheets</span>
                  <span className={stats?.connected ? 'text-green-600 font-medium' : 'text-gray-400 font-medium'}><span className={cn('inline-block w-2 h-2 rounded-full mr-1', stats?.connected ? 'bg-green-500' : 'bg-gray-300')}></span>{stats?.connected ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Last Update</span>
                  <span className="text-gray-900 font-medium">{lastUpdate || 'Just now'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Leads from Sheet */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
            <a href="https://docs.google.com/spreadsheets/d/1IMyPQyWYFD_7a3CtF340pu0LwV-TCU5hXCa8mii7JYE" 
               target="_blank" 
               className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <ExternalLink className="w-4 h-4" /> Open Sheet
            </a>
          </div>
          {stats?.leads?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Segment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.leads.map((lead: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.company_name || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{lead.industry || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{lead.country || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{lead.segment || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          'px-2 py-1 text-xs font-medium rounded-full',
                          lead.initial_tier === 'A' ? 'bg-red-100 text-red-700' :
                          lead.initial_tier === 'B' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        )}>
                          Tier {lead.initial_tier || '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No leads yet</p>
              <p className="text-sm text-gray-400">Start the research task to find leads</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}