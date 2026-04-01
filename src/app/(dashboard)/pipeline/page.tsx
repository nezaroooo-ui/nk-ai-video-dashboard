'use client';

import { useState, useEffect, useCallback } from 'react';
import { Users, Filter, Search, Plus, RefreshCw, Send, Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { DashboardLayout, designTokens } from '@/components/dashboard/layout';
import { cn } from '@/lib/utils';

const t = designTokens;
const FORCE_DARK = true;

const statusLabels: Record<string, string> = {
  'new': 'جديد',
  'researched': 'تم البحث',
  'enriched': 'مُثري',
  'ready for messaging': 'جاهز للرسائل',
  'ready for qa': 'في مراجعة الجودة',
  'approved': 'معتمد',
  'sent': 'تم الإرسال',
  'opened': 'مفتوح',
  'replied': 'رد',
  'interested': 'مهتم',
};

const statusColors: Record<string, { bg: string; text: string }> = {
  'new': { bg: 'bg-blue-400/20', text: 'text-blue-400' },
  'researched': { bg: 'bg-purple-400/20', text: 'text-purple-400' },
  'enriched': { bg: 'bg-indigo-400/20', text: 'text-indigo-400' },
  'ready for messaging': { bg: 'bg-yellow-400/20', text: 'text-yellow-400' },
  'ready for qa': { bg: 'bg-orange-400/20', text: 'text-orange-400' },
  'approved': { bg: 'bg-green-400/20', text: 'text-green-400' },
  'sent': { bg: 'bg-cyan-400/20', text: 'text-cyan-400' },
  'opened': { bg: 'bg-teal-400/20', text: 'text-teal-400' },
  'replied': { bg: 'bg-orange-400/20', text: 'text-orange-400' },
  'interested': { bg: 'bg-pink-400/20', text: 'text-pink-400' },
};

export default function PipelinePage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [sendingTo, setSendingTo] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/dashboard/stats?t=' + Date.now());
      const data = await res.json();
      
      // Filter only leads with emails
      const allLeads = data.leads || [];
      const leadsWithEmail = allLeads.filter((lead: any) => lead.email && lead.email.includes('@'));
      
      setLeads(leadsWithEmail);
    } catch (error) {
      console.error('Failed to fetch pipeline data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchQuery || 
      lead.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: leads.length,
    ready: leads.filter(l => l.current_status === 'approved' || !l.current_status).length,
    sent: leads.filter(l => l.current_status === 'sent').length,
    replied: leads.filter(l => l.current_status === 'replied').length,
  };

  const handleSendEmail = async (lead: any, emailType: string = 'initial') => {
    if (!lead.email) return;
    
    setSendingTo(lead.lead_id);
    try {
      // Send email via SMTP with professional funnel
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: lead.email,
          companyName: lead.company_name,
          emailType: emailType
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        alert(`✅ تم إرسال "${emailType}" إلى ${lead.company_name}\n\nالعنوان: ${data.details?.subject}`);
        fetchData(true);
      } else {
        alert('فشل في إرسال الرسالة');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('فشل في إرسال الرسالة');
    } finally {
      setSendingTo(null);
    }
  };

  const handleAddLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/leads/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-lead',
          leadData: {
            companyName: formData.get('companyName'),
            website: formData.get('website'),
            email: formData.get('email'),
            industry: formData.get('industry'),
            country: formData.get('country'),
            notes: formData.get('notes'),
          }
        })
      });
      
      if (res.ok) {
        setShowAddModal(false);
        fetchData(true);
      }
    } catch (error) {
      console.error('Failed to add lead:', error);
    }
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn("text-2xl font-bold", t.textPrimary)}>قائمة العملاء</h1>
            <p className={cn("mt-1", t.textMuted)}>العملاء المستعدون للمراسلة ({leads.length})</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => fetchData(true)}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-lg border", t.borderDefault, t.textSecondary, t.hover)}
            >
              <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
              تحديث
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-lg", t.accentBg, "text-white", t.accentHover)}
            >
              <Plus className="w-4 h-4" />
              إضافة عميل
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-4 text-center")}>
            <p className={cn("text-2xl font-bold", t.textPrimary)}>{stats.total}</p>
            <p className={cn("text-xs", t.textMuted)}>الإجمالي</p>
          </div>
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-4 text-center")}>
            <p className={cn("text-2xl font-bold", "text-yellow-400")}>{stats.ready}</p>
            <p className={cn("text-xs", t.textMuted)}>جاهز للإرسال</p>
          </div>
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-4 text-center")}>
            <p className={cn("text-2xl font-bold", "text-green-400")}>{stats.sent}</p>
            <p className={cn("text-xs", t.textMuted)}>تم الإرسال</p>
          </div>
          <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-4 text-center")}>
            <p className={cn("text-2xl font-bold", "text-blue-400")}>{stats.replied}</p>
            <p className={cn("text-xs", t.textMuted)}>ردود</p>
          </div>
        </div>

        {/* Search */}
        <div className={cn("relative", t.bgCard)}>
          <Search className={cn("absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4", t.textMuted)} />
          <input
            type="text"
            placeholder="البحث عن شركة أو إيميل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("w-full pr-10 py-3 rounded-lg bg-transparent border", t.borderDefault, t.textPrimary, "focus:outline-none focus:border-blue-500")}
          />
        </div>

        {/* Leads List */}
        <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault)}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={cn("border-b", t.borderDefault)}>
                  <th className={cn("px-4 py-3 text-right text-sm font-medium", t.textMuted)}>الشركة</th>
                  <th className={cn("px-4 py-3 text-right text-sm font-medium", t.textMuted)}>البريد الإلكتروني</th>
                  <th className={cn("px-4 py-3 text-right text-sm font-medium", t.textMuted)}>القطاع</th>
                  <th className={cn("px-4 py-3 text-right text-sm font-medium", t.textMuted)}>الحالة</th>
                  <th className={cn("px-4 py-3 text-right text-sm font-medium", t.textMuted)}>الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredLeads.length > 0 ? filteredLeads.map((lead, idx) => {
                  const status = lead.current_status || 'new';
                  const colors = statusColors[status] || { bg: 'bg-gray-400/20', text: 'text-gray-400' };
                  const isSent = status === 'sent';
                  
                  return (
                    <tr key={idx} className={t.hover}>
                      <td className={cn("px-4 py-3")}>
                        <p className={cn("font-medium", t.textPrimary)}>{lead.company_name}</p>
                        <p className={cn("text-xs", t.textMuted)}>{lead.website}</p>
                      </td>
                      <td className={cn("px-4 py-3", t.textSecondary)}>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                      </td>
                      <td className={cn("px-4 py-3", t.textSecondary)}>{lead.segment || lead.industry || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", colors.bg, colors.text)}>
                          {statusLabels[status] || status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          id={`email-type-${idx}`}
                          className={cn(
                            "mb-2 px-2 py-1 rounded text-xs bg-gray-800 border border-gray-700 text-gray-300"
                          )}
                          defaultValue="initial"
                        >
                          <option value="initial">📧 رسالة أولى</option>
                          <option value="followup">🔄 متابعة</option>
                          <option value="value">💡 إضافة قيمة</option>
                          <option value="final">📝 الأخيرة</option>
                        </select>
                        <button
                          onClick={() => {
                            const select = document.getElementById(`email-type-${idx}`) as HTMLSelectElement;
                            handleSendEmail(lead, select.value);
                          }}
                          disabled={sendingTo === lead.lead_id || isSent}
                          className={cn(
                            "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors w-full",
                            isSent 
                              ? "bg-green-500/20 text-green-400 cursor-default"
                              : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                          )}
                        >
                          {sendingTo === lead.lead_id ? (
                            <>
                              <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                              جاري...
                            </>
                          ) : isSent ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              تم
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              إرسال
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={5} className={cn("px-4 py-8 text-center", t.textMuted)}>
                      {leads.length === 0 ? 'لا يوجد عملاء مع إيميل' : 'لا توجد نتائج للبحث'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Lead Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "w-full max-w-md p-6")}>
              <h2 className={cn("text-xl font-bold mb-4", t.textPrimary)}>إضافة عميل جديد</h2>
              <form onSubmit={handleAddLead} className="space-y-4">
                <div>
                  <label className={cn("block text-sm mb-1", t.textSecondary)}>اسم الشركة *</label>
                  <input name="companyName" required className={cn("w-full px-3 py-2 rounded-lg bg-transparent border", t.borderDefault, t.textPrimary, "focus:outline-none focus:border-blue-500")} />
                </div>
                <div>
                  <label className={cn("block text-sm mb-1", t.textSecondary)}>الموقع *</label>
                  <input name="website" type="url" required className={cn("w-full px-3 py-2 rounded-lg bg-transparent border", t.borderDefault, t.textPrimary, "focus:outline-none focus:border-blue-500")} />
                </div>
                <div>
                  <label className={cn("block text-sm mb-1", t.textSecondary)}>البريد الإلكتروني *</label>
                  <input name="email" type="email" required className={cn("w-full px-3 py-2 rounded-lg bg-transparent border", t.borderDefault, t.textPrimary, "focus:outline-none focus:border-blue-500")} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={cn("block text-sm mb-1", t.textSecondary)}>القطاع</label>
                    <select name="industry" className={cn("w-full px-3 py-2 rounded-lg bg-transparent border", t.borderDefault, t.textPrimary, "focus:outline-none focus:border-blue-500")}>
                      <option value="Perfume/Beauty">عطور وجمال</option>
                      <option value="eCommerce">تجارة إلكترونية</option>
                      <option value="Luxury Retail">تجزئة فاخرة</option>
                      <option value="Other">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className={cn("block text-sm mb-1", t.textSecondary)}>الدولة</label>
                    <select name="country" defaultValue="SA" className={cn("w-full px-3 py-2 rounded-lg bg-transparent border", t.borderDefault, t.textPrimary, "focus:outline-none focus:border-blue-500")}>
                      <option value="SA">السعودية</option>
                      <option value="AE">الإمارات</option>
                      <option value="KW">الكويت</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={cn("block text-sm mb-1", t.textSecondary)}>ملاحظات</label>
                  <textarea name="notes" rows={2} className={cn("w-full px-3 py-2 rounded-lg bg-transparent border", t.borderDefault, t.textPrimary, "focus:outline-none focus:border-blue-500")} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowAddModal(false)} className={cn("flex-1 px-4 py-2 rounded-lg border", t.borderDefault, t.textSecondary)}>إلغاء</button>
                  <button type="submit" className={cn("flex-1 px-4 py-2 rounded-lg", t.accentBg, "text-white")}>إضافة</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}