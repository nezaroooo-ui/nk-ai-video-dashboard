'use client';

import { Settings, User, Bell, Shield, Link2, Save, Check } from 'lucide-react';
import { DashboardLayout, designTokens } from '@/components/dashboard/layout';
import { cn } from '@/lib/utils';

const t = designTokens;
const FORCE_DARK = true;

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className={cn("text-2xl font-bold", t.textPrimary)}>Settings</h1>
          <p className={cn("mt-1", t.textMuted)}>Configure your outbound system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Navigation */}
          <div className="space-y-2">
            {[
              { icon: User, label: 'Profile', active: true },
              { icon: Bell, label: 'Notifications', active: false },
              { icon: Shield, label: 'Security', active: false },
              { icon: Link2, label: 'Integrations', active: false },
              { icon: Settings, label: 'General', active: false },
            ].map((item, idx) => (
              <button
                key={idx}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                  item.active 
                    ? cn(t.accentBg, "text-white")
                    : cn(t.bgTertiary, t.textSecondary, t.hover)
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-6")}>
              <h2 className={cn("text-lg font-semibold mb-6", t.textPrimary)}>إعدادات الملف الشخصي</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={cn(t.bgTertiary, "w-16 h-16 rounded-full flex items-center justify-center")}>
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <button className={cn("px-4 py-2 rounded-lg border", t.borderDefault, t.textSecondary, t.hover)}>
                    تغيير الصورة
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={cn("block text-sm font-medium mb-2", t.textSecondary)}>الاسم</label>
                    <input
                      type="text"
                      defaultValue="Nezar Kamel"
                      className={cn("w-full px-3 py-2 rounded-lg border", t.inputBg, t.inputBorder, t.inputText)}
                    />
                  </div>
                  <div>
                    <label className={cn("block text-sm font-medium mb-2", t.textSecondary)}>البريد</label>
                    <input
                      type="email"
                      defaultValue="nezar@kamel.com"
                      className={cn("w-full px-3 py-2 rounded-lg border", t.inputBg, t.inputBorder, t.inputText)}
                    />
                  </div>
                </div>

                <div>
                  <label className={cn("block text-sm font-medium mb-2", t.textSecondary)}>المنطقة الزمنية</label>
                  <select className={cn("w-full px-3 py-2 rounded-lg border", t.inputBg, t.inputBorder, t.inputText)}>
                    <option>Europe/Paris</option>
                    <option>Asia/Riyadh</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-6")}>
              <h2 className={cn("text-lg font-semibold mb-6", t.textPrimary)}>إعدادات الإشعارات</h2>
              <div className="space-y-4">
                {[
                  { label: 'إشعارات التليجرام', desc: 'تلقي التحديثات على التليجرام', enabled: true },
                  { label: 'البريد الإلكتروني', desc: 'تلقي التقارير اليومية', enabled: true },
                  { label: 'تنبيهات الفشل', desc: 'الإشعار عند فشل المهمة', enabled: true },
                  { label: 'ملخص أسبوعي', desc: 'تلقي ملخص كل أحد', enabled: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                    <div>
                      <p className={cn("font-medium", t.textPrimary)}>{item.label}</p>
                      <p className={cn("text-sm", t.textMuted)}>{item.desc}</p>
                    </div>
                    <button 
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        item.enabled ? "bg-blue-600" : "bg-gray-700"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        item.enabled ? "translate-x-7" : "translate-x-1"
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className={cn("flex items-center gap-2 px-6 py-2 rounded-lg", t.accentBg, "text-white", t.accentHover)}>
                <Check className="w-4 h-4" />
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}