'use client';

import { useState, useEffect, useCallback } from 'react';
import { BarChart3, TrendingUp, Mail, Users, RefreshCw } from 'lucide-react';
import { DashboardLayout, designTokens } from '@/components/dashboard/layout';
import { cn } from '@/lib/utils';

const t = designTokens;
const FORCE_DARK = true;

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/dashboard/stats?t=' + Date.now());
      const data = await res.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate real metrics
  const totalLeads = stats?.totalLeads || 0;
  const sent = stats?.pipeline?.sent || 0;
  const replied = stats?.pipeline?.replied || 0;
  const interested = stats?.pipeline?.interested || 0;

  const openRate = sent > 0 ? Math.round((replied / sent) * 100) : 0;
  const replyRate = sent > 0 ? Math.round((replied / sent) * 100) : 0;
  const interestRate = replied > 0 ? Math.round((interested / replied) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn("text-2xl font-bold", t.textPrimary)}>Analytics</h1>
            <p className={cn("mt-1", t.textMuted)}>مقاييس الأداء الحقيقية</p>
          </div>
          <button 
            onClick={() => fetchData(true)}
            className={cn("flex items-center gap-2 px-4 py-2 rounded-lg border", t.borderDefault, t.textSecondary, t.hover)}
          >
            <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
            تحديث
          </button>
        </div>

        {/* Metrics Grid - Real Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-5")}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className={t.textMuted}>إجمالي العملاء</span>
            </div>
            <p className={cn("text-3xl font-bold mb-1", t.textPrimary)}>{totalLeads}</p>
            <span className={cn("text-sm", t.textMuted)}>مع إيميل</span>
          </div>

          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-5")}>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-purple-400" />
              <span className={t.textMuted}>تم الإرسال</span>
            </div>
            <p className={cn("text-3xl font-bold mb-1", t.textPrimary)}>{sent}</p>
            <span className={cn("text-sm", t.textMuted)}>بريد إلكتروني</span>
          </div>

          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-5")}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className={t.textMuted}>معدل الرد</span>
            </div>
            <p className={cn("text-3xl font-bold mb-1", t.textPrimary)}>{replyRate}%</p>
            <span className={cn("text-sm", t.textMuted)}>({replied} رد)</span>
          </div>

          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-5")}>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-yellow-400" />
              <span className={t.textMuted}>مهتمين</span>
            </div>
            <p className={cn("text-3xl font-bold mb-1", t.textPrimary)}>{interested}</p>
            <span className={cn("text-sm", t.textMuted)}>{interestRate}% من الردود</span>
          </div>
        </div>

        {/* Performance by Channel - Email Only */}
        <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-6")}>
          <h3 className={cn("text-lg font-semibold mb-6", t.textPrimary)}>أداء البريد الإلكتروني</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={t.textSecondary}>البريد الإلكتروني</span>
                  <span className={t.textSecondary}>{sent} مرسل</span>
                </div>
                <div className={cn("h-3 rounded-full bg-gray-800")}>
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className={cn(t.bgCard, "rounded-lg border", t.borderDefault, "p-4 text-center")}>
                <p className={cn("text-2xl font-bold", t.textPrimary)}>{sent}</p>
                <p className={cn("text-sm", t.textMuted)}>أرسلت</p>
              </div>
              <div className={cn(t.bgCard, "rounded-lg border", t.borderDefault, "p-4 text-center")}>
                <p className={cn("text-2xl font-bold", "text-green-400")}>{replied}</p>
                <p className={cn("text-sm", t.textMuted)}>ردت</p>
              </div>
              <div className={cn(t.bgCard, "rounded-lg border", t.borderDefault, "p-4 text-center")}>
                <p className={cn("text-2xl font-bold", "text-blue-400")}>{interested}</p>
                <p className={cn("text-sm", t.textMuted)}>مهتمة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State if no data */}
        {totalLeads === 0 && (
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-8 text-center")}>
            <p className={cn("text-lg font-medium", t.textPrimary)}>لا توجد بيانات بعد</p>
            <p className={cn("text-sm mt-2", t.textMuted)}>أضف عملاء وابدأ بإرسال الرسائل لرؤية التحليلات</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}