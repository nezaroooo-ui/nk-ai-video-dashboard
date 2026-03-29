'use client';

import { 
  Users, 
  Mail, 
  MessageSquare, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { cn, formatPercent, getStatusColor, formatDate } from '@/lib/utils';

// Mock data for demonstration
const kpiData = {
  leadsAdded: 15,
  leadsAddedChange: 12,
  leadsEnriched: 12,
  leadsEnrichedChange: 8,
  messagesSent: 8,
  messagesSentChange: 14,
  replies: 2,
  repliesChange: -33,
  positiveReplies: 1,
  meetingsRequested: 0,
  replyRate: 25,
  replyRateChange: 5,
};

const topOpportunities = [
  {
    id: '1',
    company: 'Luxe Beauty Co',
    segment: 'Perfume/Beauty',
    tier: 'A',
    score: 9.2,
    status: 'interested',
    nextAction: 'Send samples',
    value: '$3,000',
  },
  {
    id: '2',
    company: 'PropertyTech',
    segment: 'Real Estate',
    tier: 'A',
    score: 8.5,
    status: 'meeting_requested',
    nextAction: 'Escalate to founder',
    value: '$5,000',
  },
  {
    id: '3',
    company: 'ShopMax',
    segment: 'eCommerce',
    tier: 'B',
    score: 8.1,
    status: 'need_details',
    nextAction: 'Respond with pricing',
    value: '$2,500',
  },
];

const recentActivity = [
  {
    id: '1',
    agent: 'Mazen',
    action: 'completed research',
    description: '5 new leads added',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    agent: 'Layan',
    action: 'completed enrichment',
    description: '4 leads enriched',
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    agent: 'Sara',
    action: 'completed messaging',
    description: '12 message drafts ready',
    timestamp: '45 min ago',
  },
  {
    id: '4',
    agent: 'Hala',
    action: 'completed QA',
    description: '10 approved, 2 revision',
    timestamp: '30 min ago',
  },
  {
    id: '5',
    agent: 'Adham',
    action: 'completed sending',
    description: '8 messages sent',
    timestamp: '15 min ago',
  },
];

const pipelineStages = [
  { name: 'New', count: 5, color: 'bg-gray-500' },
  { name: 'Researched', count: 3, color: 'bg-blue-500' },
  { name: 'Enriched', count: 8, color: 'bg-indigo-500' },
  { name: 'Ready for Messaging', count: 12, color: 'bg-purple-500' },
  { name: 'Ready for QA', count: 4, color: 'bg-violet-500' },
  { name: 'Approved', count: 10, color: 'bg-teal-500' },
  { name: 'Sent', count: 45, color: 'bg-cyan-500' },
  { name: 'Replied', count: 8, color: 'bg-amber-500' },
  { name: 'Interested', count: 5, color: 'bg-green-500' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Overview</h1>
          <p className="text-gray-500 mt-1">Daily performance and system status</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Leads Added"
            value={kpiData.leadsAdded}
            change={kpiData.leadsAddedChange}
            changeLabel="vs yesterday"
            icon={Users}
            variant="default"
          />
          <KPICard
            title="Leads Enriched"
            value={kpiData.leadsEnriched}
            change={kpiData.leadsEnrichedChange}
            changeLabel="vs yesterday"
            icon={Target}
            variant="default"
          />
          <KPICard
            title="Messages Sent"
            value={kpiData.messagesSent}
            change={kpiData.messagesSentChange}
            changeLabel="vs yesterday"
            icon={Mail}
            variant="success"
          />
          <KPICard
            title="Replies"
            value={kpiData.replies}
            change={kpiData.repliesChange}
            changeLabel="vs yesterday"
            icon={MessageSquare}
            variant={kpiData.repliesChange >= 0 ? 'success' : 'danger'}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Reply Rate</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {formatPercent(kpiData.replyRate)}
                </p>
              </div>
              <div className={cn(
                'flex items-center gap-1 text-sm font-medium',
                kpiData.replyRateChange >= 0 ? 'text-green-600' : 'text-red-600'
              )}>
                {kpiData.replyRateChange >= 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {Math.abs(kpiData.replyRateChange)}%
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Positive Replies</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {kpiData.positiveReplies}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Meetings Requested</p>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {kpiData.meetingsRequested}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Opportunities */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Top Opportunities</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {topOpportunities.map((opp) => (
                <div key={opp.id} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{opp.company}</span>
                        <span className={cn(
                          'px-2 py-0.5 text-xs font-medium rounded-full border',
                          opp.tier === 'A' ? 'bg-red-100 text-red-700 border-red-200' :
                          opp.tier === 'B' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                          'bg-gray-100 text-gray-700 border-gray-200'
                        )}>
                          Tier {opp.tier}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{opp.segment}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={cn('px-2 py-1 text-xs font-medium rounded-full', getStatusColor(opp.status))}>
                          {opp.status.replace('_', ' ')}
                        </span>
                        <span className="text-sm text-gray-600">Score: {opp.score}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-gray-900">{opp.value}</span>
                      <p className="text-sm text-gray-500 mt-1">{opp.nextAction}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="px-6 py-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-blue-700">
                        {activity.agent.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.agent} {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline Visual */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Pipeline Overview</h2>
          <div className="flex items-end gap-2 h-32">
            {pipelineStages.map((stage, index) => (
              <div key={stage.name} className="flex-1 flex flex-col items-center">
                <div 
                  className={cn('w-full rounded-t-lg', stage.color)}
                  style={{ height: `${(stage.count / 50) * 100}%` }}
                />
                <span className="text-xs text-gray-500 mt-2 text-center truncate w-full">
                  {stage.name}
                </span>
                <span className="text-sm font-medium text-gray-700">{stage.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
            <span className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              All systems operational
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { name: 'Google Sheets', status: 'Healthy', latency: '120ms' },
              { name: 'Gmail API', status: 'Healthy', latency: '45ms' },
              { name: 'Telegram Bot', status: 'Healthy', latency: '30ms' },
              { name: 'Database', status: 'Healthy', latency: '25ms' },
            ].map((system) => (
              <div key={system.name} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-gray-700">{system.name}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{system.latency}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}