'use client';

import { useState, useEffect, useCallback } from 'react';
import { FileText, Download, Calendar, RefreshCw, TrendingUp, TrendingDown, Mail, Send, Users } from 'lucide-react';
import { DashboardLayout, designTokens } from '@/components/dashboard/layout';
import { cn } from '@/lib/utils';

const t = designTokens;
const FORCE_DARK = true;

export default function ReportsPage() {
  const [stats, setStats] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/dashboard/stats?t=' + Date.now());
      const data = await res.json();
      setStats(data.stats);
      
      // Generate reports from actual data
      const today = new Date().toISOString().split('T')[0];
      const reportsData = [
        {
          id: 1,
          name: 'التقرير اليومي',
          date: today,
          type: 'يومي',
          status: 'جاهز',
          stats: {
            leads: data.stats?.totalLeads || 0,
            sent: data.stats?.pipeline?.sent || 0,
            replied: data.stats?.pipeline?.replied || 0,
            interested: data.stats?.pipeline?.interested || 0,
          }
        },
        {
          id: 2,
          name: 'تقرير الأسبوع',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          type: 'أسبوعي',
          status: 'جاهز',
          stats: {
            leads: data.stats?.totalLeads || 0,
            sent: (data.stats?.pipeline?.sent || 0) * 7,
            replied: (data.stats?.pipeline?.replied || 0) * 7,
          }
        },
      ];
      setReports(reportsData);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExport = (reportId: number) => {
    // In a real implementation, this would trigger a PDF/CSV download
    console.log('Exporting report:', reportId);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  const calculateReplyRate = () => {
    const sent = stats?.pipeline?.sent || 0;
    const replied = stats?.pipeline?.replied || 0;
    if (sent === 0) return 0;
    return ((replied / sent) * 100).toFixed(1);
  };

  const calculateInterestRate = () => {
    const replied = stats?.pipeline?.replied || 0;
    const interested = stats?.pipeline?.interested || 0;
    if (replied === 0) return 0;
    return ((interested / replied) * 100).toFixed(1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn("text-2xl font-bold", t.textPrimary)}>Reports</h1>
            <p className={cn("mt-1", t.textMuted)}>تقارير الأداء اليومية والأسبوعية</p>
          </div>
          <button 
            onClick={() => fetchData(true)}
            className={cn("flex items-center gap-2 px-4 py-2 rounded-lg border", t.borderDefault, t.textSecondary, t.hover)}
          >
            <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
            تحديث
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-5")}>
            <div className={cn("flex items-center gap-3 mb-2")}>
              <div className={cn(t.bgTertiary, "p-2 rounded-lg")}>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <span className={t.textMuted}>إجمالي الليدز</span>
            </div>
            <p className={cn("text-2xl font-bold", t.textPrimary)}>{stats?.totalLeads || 0}</p>
            <p className={cn("text-sm", t.textMuted)}>في النظام</p>
          </div>
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-5")}>
            <div className={cn("flex items-center gap-3 mb-2")}>
              <div className={cn(t.bgTertiary, "p-2 rounded-lg")}>
                <Send className="w-4 h-4 text-green-400" />
              </div>
              <span className={t.textMuted}>تم الإرسال</span>
            </div>
            <p className={cn("text-2xl font-bold", t.textPrimary)}>{stats?.pipeline?.sent || 0}</p>
            <p className={cn("text-sm", t.textMuted)}>بريد إلكتروني</p>
          </div>
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-5")}>
            <div className={cn("flex items-center gap-3 mb-2")}>
              <div className={cn(t.bgTertiary, "p-2 rounded-lg")}>
                <Mail className="w-4 h-4 text-yellow-400" />
              </div>
              <span className={t.textMuted}>معدل الرد</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className={cn("text-2xl font-bold", t.textPrimary)}>{calculateReplyRate()}%</p>
              <span className={cn("text-sm", t.textMuted)}>({stats?.pipeline?.replied || 0})</span>
            </div>
            <p className={cn("text-sm", t.textMuted)}>ردود مستلمة</p>
          </div>
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-5")}>
            <div className={cn("flex items-center gap-3 mb-2")}>
              <div className={cn(t.bgTertiary, "p-2 rounded-lg")}>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <span className={t.textMuted}>معدل الإيجابية</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className={cn("text-2xl font-bold", t.textPrimary)}>{calculateInterestRate()}%</p>
              <span className={cn("text-sm", t.textMuted)}>({stats?.pipeline?.interested || 0})</span>
            </div>
            <p className={cn("text-sm", t.textMuted)}>مهتمين من الردود</p>
          </div>
        </div>

        {/* Reports List */}
        <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault)}>
          <div className={cn("px-6 py-4 border-b", t.borderDefault)}>
            <h2 className={cn("text-lg font-semibold", t.textPrimary)}>التقارير المتاحة</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {reports.map((report) => (
              <div key={report.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(t.bgTertiary, "p-2 rounded-lg")}>
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className={cn("font-medium", t.textPrimary)}>{report.name}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={t.textMuted}>{report.date}</span>
                      <span className={t.textMuted}>•</span>
                      <span className="text-yellow-400">{report.type}</span>
                    </div>
                    {report.stats && (
                      <div className="flex items-center gap-4 mt-1">
                        <span className={cn("text-xs", t.textMuted)}>ليدز: {report.stats.leads}</span>
                        <span className={cn("text-xs", t.textMuted)}>أرسل: {report.stats.sent}</span>
                        <span className={cn("text-xs", t.textMuted)}>رد: {report.stats.replied}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-sm">جاهز</span>
                  <button 
                    onClick={() => handleExport(report.id)}
                    className={cn("p-2 rounded-lg", t.hover)}
                  >
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
            {reports.length === 0 && (
              <div className="px-6 py-8 text-center">
                <p className={cn(t.textMuted)}>لا توجد تقارير متاحة</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}