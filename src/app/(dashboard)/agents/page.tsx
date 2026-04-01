'use client';

import { useState } from 'react';
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
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  Zap,
  RefreshCw
} from 'lucide-react';
import { DashboardLayout, designTokens } from '@/components/dashboard/layout';
import { cn } from '@/lib/utils';

const t = designTokens;
const FORCE_DARK = true;

const agents = [
  {
    id: 'kareem',
    name: 'Kareem',
    title: 'Chief Growth Orchestrator',
    role: 'Orchestrator',
    status: 'active',
    currentTask: 'Reviewing daily pipeline',
    lastActivity: '2 min ago',
    todayStats: { tasks: 12, completed: 10 },
    icon: Users,
    color: 'bg-purple-500',
    description: 'Manages all agents, launches workflows, escalates to founder',
  },
  {
    id: 'mazen',
    name: 'Mazen',
    title: 'Lead Research Analyst',
    role: 'Research',
    status: 'idle',
    currentTask: 'Waiting for next research cycle',
    lastActivity: '1 hour ago',
    todayStats: { tasks: 8, completed: 8 },
    icon: Search,
    color: 'bg-blue-500',
    description: 'Discovers new qualified leads online',
  },
  {
    id: 'layan',
    name: 'Layan',
    title: 'Lead Enrichment Strategist',
    role: 'Enrichment',
    status: 'idle',
    currentTask: 'Waiting for enriched leads',
    lastActivity: '3 hours ago',
    todayStats: { tasks: 5, completed: 5 },
    icon: Target,
    color: 'bg-indigo-500',
    description: 'Analyzes and enriches raw leads with insights',
  },
  {
    id: 'yara',
    name: 'Yara',
    title: 'Messaging Strategy Architect',
    role: 'Strategy',
    status: 'idle',
    currentTask: 'Waiting for segment data',
    lastActivity: '4 hours ago',
    todayStats: { tasks: 3, completed: 3 },
    icon: MessageSquare,
    color: 'bg-pink-500',
    description: 'Builds segment-based messaging strategy',
  },
  {
    id: 'sara',
    name: 'Sara',
    title: 'Senior Outreach Copywriter',
    role: 'Copywriting',
    status: 'idle',
    currentTask: 'Waiting for strategy approval',
    lastActivity: '5 hours ago',
    todayStats: { tasks: 6, completed: 6 },
    icon: Zap,
    color: 'bg-orange-500',
    description: 'Writes high-converting outreach messages',
  },
  {
    id: 'hala',
    name: 'Hala',
    title: 'QA and Deliverability Reviewer',
    role: 'QA',
    status: 'idle',
    currentTask: 'Waiting for message drafts',
    lastActivity: '6 hours ago',
    todayStats: { tasks: 4, completed: 4 },
    icon: CheckCircle,
    color: 'bg-green-500',
    description: 'Reviews messages for quality and deliverability',
  },
  {
    id: 'adham',
    name: 'Adham',
    title: 'Outreach Operations Specialist',
    role: 'Operations',
    status: 'idle',
    currentTask: 'Waiting for QA approval',
    lastActivity: '6 hours ago',
    todayStats: { tasks: 2, completed: 2 },
    icon: Send,
    color: 'bg-cyan-500',
    description: 'Executes approved outreach campaigns',
  },
  {
    id: 'reem',
    name: 'Reem',
    title: 'Pipeline and CRM Coordinator',
    role: 'CRM',
    status: 'idle',
    currentTask: 'Waiting for daily updates',
    lastActivity: '7 hours ago',
    todayStats: { tasks: 10, completed: 10 },
    icon: Activity,
    color: 'bg-teal-500',
    description: 'Manages lead pipeline and CRM updates',
  },
  {
    id: 'hani',
    name: 'Hani',
    title: 'Reply Qualification Specialist',
    role: 'Replies',
    status: 'idle',
    currentTask: 'Waiting for replies',
    lastActivity: '8 hours ago',
    todayStats: { tasks: 15, completed: 12 },
    icon: MessageSquare,
    color: 'bg-yellow-500',
    description: 'Analyzes and qualifies incoming replies',
  },
  {
    id: 'nader',
    name: 'Nader',
    title: 'Reporting and Dashboard Analyst',
    role: 'Analytics',
    status: 'idle',
    currentTask: 'Waiting for end of day',
    lastActivity: '9 hours ago',
    todayStats: { tasks: 2, completed: 2 },
    icon: BarChart3,
    color: 'bg-red-500',
    description: 'Generates reports and updates dashboards',
  },
  {
    id: 'saleem',
    name: 'Saleem',
    title: 'Product Engineer and Dashboard Architect',
    role: 'Engineering',
    status: 'active',
    currentTask: 'Monitoring system health',
    lastActivity: 'Now',
    todayStats: { tasks: 5, completed: 4 },
    icon: Settings,
    color: 'bg-gray-500',
    description: 'Builds and maintains technical infrastructure',
  },
];

export default function AgentsPage() {
  const [runningAgents, setRunningAgents] = useState<string[]>([]);

  const toggleAgent = (agentId: string) => {
    if (runningAgents.includes(agentId)) {
      setRunningAgents(runningAgents.filter(id => id !== agentId));
    } else {
      setRunningAgents([...runningAgents, agentId]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-green-500/20', text: 'text-green-400', label: 'نشط' };
      case 'idle':
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'خامل' };
      case 'error':
        return { bg: 'bg-red-500/20', text: 'text-red-400', label: 'خطأ' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: status };
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn('text-2xl font-bold', t.textPrimary)}>الوكلاء</h1>
            <p className={cn('mt-1', t.textMuted)}>فريق الأتمتة الذكي</p>
          </div>
          <button className={cn('flex items-center gap-2 px-4 py-2 rounded-lg', t.accentBg, 'text-white', t.accentHover)}>
            <RefreshCw className="w-4 h-4" />
            تحديث الكل
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-4')}>
            <p className={cn('text-2xl font-bold', t.textPrimary)}>{agents.length}</p>
            <p className={cn('text-sm', t.textMuted)}>إجمالي الوكلاء</p>
          </div>
          <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-4')}>
            <p className={cn('text-2xl font-bold', 'text-green-400')}>{agents.filter(a => a.status === 'active').length}</p>
            <p className={cn('text-sm', t.textMuted)}>نشط</p>
          </div>
          <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-4')}>
            <p className={cn('text-2xl font-bold', 'text-gray-400')}>{agents.filter(a => a.status === 'idle').length}</p>
            <p className={cn('text-sm', t.textMuted)}>خامل</p>
          </div>
          <div className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-4')}>
            <p className={cn('text-2xl font-bold', t.textPrimary)}>{agents.reduce((acc, a) => acc + a.todayStats.completed, 0)}</p>
            <p className={cn('text-sm', t.textMuted)}>مهام اليوم</p>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => {
            const statusBadge = getStatusBadge(agent.status);
            const isRunning = runningAgents.includes(agent.id);
            
            return (
              <div 
                key={agent.id}
                className={cn(t.bgCard, 'rounded-xl border', t.borderDefault, 'p-5')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', agent.color)}>
                      <agent.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className={cn('font-semibold', t.textPrimary)}>{agent.name}</h3>
                      <p className={cn('text-sm', t.textMuted)}>{agent.title}</p>
                    </div>
                  </div>
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusBadge.bg, statusBadge.text)}>
                    {statusBadge.label}
                  </span>
                </div>

                <p className={cn('text-sm mb-4', t.textSecondary)}>{agent.description}</p>

                <div className={cn('flex items-center justify-between text-sm mb-4', t.textMuted)}>
                  <span>المهمة الحالية:</span>
                  <span className={t.textSecondary}>{agent.currentTask}</span>
                </div>

                <div className={cn('flex items-center justify-between text-sm mb-4', t.textMuted)}>
                  <span>آخر نشاط:</span>
                  <span className={t.textSecondary}>{agent.lastActivity}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-4 text-sm">
                    <span className={t.textMuted}>
                      <span className={t.textSecondary}>{agent.todayStats.completed}</span>/{agent.todayStats.tasks} مهام
                    </span>
                  </div>
                  <button
                    onClick={() => toggleAgent(agent.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                      isRunning 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    )}
                  >
                    {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {isRunning ? 'إيقاف' : 'تشغيل'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}