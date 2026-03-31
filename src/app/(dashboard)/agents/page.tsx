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
  Pause
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { cn } from '@/lib/utils';

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
    currentTask: 'Waiting for message strategy',
    lastActivity: '5 hours ago',
    todayStats: { tasks: 15, completed: 12 },
    icon: Edit3,
    color: 'bg-rose-500',
    description: 'Writes outreach messages and variants',
  },
  {
    id: 'hala',
    name: 'Hala',
    title: 'QA and Deliverability Reviewer',
    role: 'QA',
    status: 'idle',
    currentTask: 'Waiting for message drafts',
    lastActivity: '6 hours ago',
    todayStats: { tasks: 12, completed: 10 },
    icon: CheckCircle,
    color: 'bg-green-500',
    description: 'Reviews messages for quality and deliverability',
  },
  {
    id: 'adham',
    name: 'Adham',
    title: 'Outreach Operations Specialist',
    role: 'Sending',
    status: 'idle',
    currentTask: 'Waiting for approved messages',
    lastActivity: '7 hours ago',
    todayStats: { tasks: 8, completed: 8 },
    icon: Send,
    color: 'bg-cyan-500',
    description: 'Sends approved outreach through Gmail',
  },
  {
    id: 'reem',
    name: 'Reem',
    title: 'Pipeline and CRM Coordinator',
    role: 'Pipeline',
    status: 'idle',
    currentTask: 'Waiting for updates',
    lastActivity: '8 hours ago',
    todayStats: { tasks: 20, completed: 18 },
    icon: BarChart3,
    color: 'bg-orange-500',
    description: 'Maintains pipeline state and CRM hygiene',
  },
  {
    id: 'hani',
    name: 'Hani',
    title: 'Reply Qualification Specialist',
    role: 'Replies',
    status: 'idle',
    currentTask: 'No new replies',
    lastActivity: '9 hours ago',
    todayStats: { tasks: 5, completed: 5 },
    icon: MessageCircle,
    color: 'bg-yellow-500',
    description: 'Reads and classifies inbound replies',
  },
  {
    id: 'nader',
    name: 'Nader',
    title: 'Reporting and Dashboard Analyst',
    role: 'Reporting',
    status: 'idle',
    currentTask: 'Scheduled for 6 PM',
    lastActivity: '10 hours ago',
    todayStats: { tasks: 2, completed: 2 },
    icon: BarChart3,
    color: 'bg-teal-500',
    description: 'Updates dashboards and generates reports',
  },
  {
    id: 'saleem',
    name: 'Saleem',
    title: 'Product Engineer and Dashboard Architect',
    role: 'Technical',
    status: 'active',
    currentTask: 'Monitoring system health',
    lastActivity: '1 min ago',
    todayStats: { tasks: 5, completed: 4 },
    icon: Settings,
    color: 'bg-gray-600',
    description: 'Builds and maintains technical system',
  },
];

const recentActivities = [
  { agent: 'Kareem', action: 'Generated evening report', time: '7:30 PM' },
  { agent: 'Nader', action: 'Updated dashboard metrics', time: '6:45 PM' },
  { agent: 'Adham', action: 'Sent 8 messages', time: '5:15 PM' },
  { agent: 'Hala', action: 'Approved 10 messages', time: '3:30 PM' },
  { agent: 'Sara', action: 'Wrote 12 message drafts', time: '2:00 PM' },
  { agent: 'Layan', action: 'Enriched 4 leads', time: '12:30 PM' },
  { agent: 'Mazen', action: 'Researched 5 new leads', time: '9:00 AM' },
];

function Edit3({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      <path d="m15 5 4 4"/>
    </svg>
  );
}

function MessageCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  );
}

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'idle'>('all');

  const filteredAgents = agents.filter(agent => {
    if (filter === 'all') return true;
    return agent.status === filter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
            <p className="text-gray-500 mt-1">Monitor and control all system agents</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'idle')}
            >
              <option value="all">All Agents</option>
              <option value="active">Active</option>
              <option value="idle">Idle</option>
            </select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Agents</p>
                <p className="text-xl font-semibold">{agents.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Now</p>
                <p className="text-xl font-semibold">{agents.filter(a => a.status === 'active').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tasks Today</p>
                <p className="text-xl font-semibold">{agents.reduce((sum, a) => sum + a.todayStats.tasks, 0)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-semibold">{agents.reduce((sum, a) => sum + a.todayStats.completed, 0)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agents List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">System Agents</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {filteredAgents.map((agent) => {
                  const Icon = agent.icon;
                  return (
                    <div 
                      key={agent.id}
                      className={cn(
                        'px-6 py-4 cursor-pointer transition-colors hover:bg-gray-50',
                        selectedAgent === agent.id && 'bg-blue-50'
                      )}
                      onClick={() => setSelectedAgent(agent.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', agent.color)}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{agent.name}</span>
                              <span className={cn(
                                'px-2 py-0.5 text-xs font-medium rounded-full',
                                agent.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                              )}>
                                {agent.status === 'active' ? 'Active' : 'Idle'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{agent.title}</p>
                            <p className="text-xs text-gray-400 mt-1">Last activity: {agent.lastActivity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{agent.currentTask}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {agent.todayStats.completed}/{agent.todayStats.tasks} tasks
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Agent Details & Activity */}
          <div className="space-y-6">
            {/* Selected Agent Details */}
            {selectedAgent && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                {(() => {
                  const agent = agents.find(a => a.id === selectedAgent);
                  if (!agent) return null;
                  const Icon = agent.icon;
                  return (
                    <>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', agent.color)}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                          <p className="text-sm text-gray-500">{agent.title}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Status</span>
                          <span className={cn(
                            'px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1',
                            agent.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          )}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {agent.status === 'active' ? 'Active' : 'Idle'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Current Task</span>
                          <span className="text-sm text-gray-900">{agent.currentTask}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Tasks Today</span>
                          <span className="text-sm text-gray-900">
                            {agent.todayStats.completed}/{agent.todayStats.tasks}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-200 flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                          <Play className="w-4 h-4 inline-block mr-1" />
                          Run Now
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="px-6 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{activity.agent}</span>
                        <span className="text-xs text-gray-400">→</span>
                        <span className="text-sm text-gray-600">{activity.action}</span>
                      </div>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}