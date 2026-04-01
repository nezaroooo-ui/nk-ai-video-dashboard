'use client';

import { useState } from 'react';
import { DashboardLayout, designTokens } from '@/components/dashboard/layout';
import { 
  Mail, 
  Copy, 
  Check, 
  Send, 
  Palette, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const t = designTokens;
const FORCE_DARK = true;

const segments = [
  { id: 'ecommerce', name: 'تجارة إلكترونية', icon: '🛒' },
  { id: 'beauty', name: 'جمال وعطور', icon: '✨' },
  { id: 'fashion', name: 'أزياء', icon: '👗' },
  { id: 'electronics', name: 'إلكترونيات', icon: '📱' },
];

const emailTemplates = {
  beauty: {
    subject: 'سؤال حول علامتك التجارية',
    opening: `أهلاً {{name}}،

صادفت متجرك {company} وأعجبتني العلامة التجارية التي تبنيها.`,
    body: `تستحق منتجاتك أن تُعرض بأفضل شكل. معظم العلامات التجارية التي نعمل معها لديها محتوى بصري ثمين لا تعرف حتى أنه موجود.

لاحظت أن:
- منتجاتك ذات جودة عالية
- لكن صورك الحالية قد لا تحقق التحويلات بالشكل المطلوب

ساعدنا علامات تجارية مشابهة في السعودية على زيادة تفاعلها بنسبة 3-5 أضعاف باستخدام محتوى الفيديو بالذكاء الاصطناعي بأسعار معقولة.

هل أنت مستعد لمكالمة سريعة لمدة 5 دقائق لرؤية أمثلة خاصة بعلامتك التجارية؟`,
    cta: 'احجز عرضاً سريعاً',
  },
  ecommerce: {
    subject: 'سؤال سريع حول {{company}}',
    opening: `أهلاً {{name}}،

تصفحت متجرك ولاحظت منتجات رائعة.`,
    body: `مجموعتك قوية، لكن هذا الذي أراه يوقف معظم متاجر التجارة الإلكترونية:

الصور الثابتة لا تأخذك بعيداً. منافسيك يستخدمون الفيديو لعرض المنتجات بطرق توقف المستخدم وتدفعه للشراء.

ساعدنا متاجر مثلك:
- زيادة العائد على الإعلان بنسبة 40-60%
- تقليل تكاليف إنتاج المحتوى بنسبة 70%
- إنشاء إعلانات تحقق مبيعات حقيقية

أفضل جزء؟ لست بحاجة لفريق إنتاج.

هل تريد أن ترى ما ممكن لمتجرك؟`,
    cta: 'شاهد الأمثلة',
  },
};

export default function EmailTemplatesPage() {
  const [selectedSegment, setSelectedSegment] = useState('beauty');
  const [preview, setPreview] = useState(emailTemplates.beauty);
  const [customize, setCustomize] = useState({
    companyName: '',
    contactName: '',
    personalization: '',
  });
  const [copied, setCopied] = useState(false);

  const handleSegmentChange = (segmentId: string) => {
    setSelectedSegment(segmentId);
    setPreview(emailTemplates[segmentId as keyof typeof emailTemplates] || emailTemplates.ecommerce);
  };

  const copyToClipboard = () => {
    const fullEmail = `Subject: ${preview.subject}

${preview.opening}

${preview.body}

${preview.cta}`;
    navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatedEmail = `
الموضوع: ${preview.subject.replace('{{name}}', customize.contactName || '[الاسم]').replace('{{company}}', customize.companyName || '[الشركة]')}

${preview.opening.replace('{{name}}', customize.contactName || '[الاسم]').replace('{company}', customize.companyName || '[الشركة]')}

${preview.body.replace('{company}', customize.companyName || '[الشركة]')}

مع التحية،
نزار كامل
---
${preview.cta}
`.trim();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn("text-2xl font-bold", t.textPrimary)}>
              قوالب البريد الإلكتروني
            </h1>
            <p className={cn("mt-1", t.textMuted)}>
              أنشئ وتخصيص قوالب التواصل لكل قطاع
            </p>
          </div>
          <button className={cn("flex items-center gap-2 px-4 py-2 rounded-lg", t.accentBg, "text-white", t.accentHover)}>
            <Send className="w-4 h-4" />
            إرسال بريد تجريبي
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Segment Selection & Customization */}
          <div className="space-y-6">
            {/* Segment Selector */}
            <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-6")}>
              <h3 className={cn("font-semibold mb-4 flex items-center gap-2", t.textPrimary)}>
                <Palette className="w-4 h-4" />
                اختر القطاع
              </h3>
              <div className="space-y-2">
                {segments.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => handleSegmentChange(segment.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                      selectedSegment === segment.id
                        ? cn(t.accentBg, 'text-white border-2 border-blue-500')
                        : cn(t.bgTertiary, 'border-2 border-transparent hover:bg-gray-700', t.textSecondary)
                    )}
                  >
                    <span className="text-xl">{segment.icon}</span>
                    <span className="font-medium">{segment.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization */}
            <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault, "p-6")}>
              <h3 className={cn("font-semibold mb-4 flex items-center gap-2", t.textPrimary)}>
                <Sparkles className="w-4 h-4" />
                تخصيص
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={cn("block text-sm font-medium mb-1", t.textSecondary)}>
                    اسم الشركة
                  </label>
                  <input
                    type="text"
                    value={customize.companyName}
                    onChange={(e) => setCustomize({...customize, companyName: e.target.value})}
                    placeholder="مثال: حياة بيوتي"
                    className={cn("w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      t.inputBg, t.inputBorder, t.inputText, t.inputPlaceholder
                    )}
                  />
                </div>
                <div>
                  <label className={cn("block text-sm font-medium mb-1", t.textSecondary)}>
                    اسم جهة الاتصال
                  </label>
                  <input
                    type="text"
                    value={customize.contactName}
                    onChange={(e) => setCustomize({...customize, contactName: e.target.value})}
                    placeholder="مثال: أحمد"
                    className={cn("w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      t.inputBg, t.inputBorder, t.inputText, t.inputPlaceholder
                    )}
                  />
                </div>
                <div>
                  <label className={cn("block text-sm font-medium mb-1", t.textSecondary)}>
                    نقطة تخصيص
                  </label>
                  <textarea
                    value={customize.personalization}
                    onChange={(e) => setCustomize({...customize, personalization: e.target.value})}
                    placeholder="أضف ملاحظة محددة عن علامتهم التجارية..."
                    rows={3}
                    className={cn("w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      t.inputBg, t.inputBorder, t.inputText, t.inputPlaceholder
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Email Preview */}
          <div className="lg:col-span-2">
            <div className={cn(t.bgCard, "rounded-xl border", t.borderDefault)}>
              <div className={cn("px-6 py-4 border-b flex items-center justify-between", t.borderDefault)}>
                <h3 className={cn("font-semibold flex items-center gap-2", t.textPrimary)}>
                  <Mail className="w-4 h-4" />
                  معاينة البريد
                </h3>
                <button
                  onClick={copyToClipboard}
                  className={cn("flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors",
                    t.hover, t.textMuted
                  )}
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'تم النسخ!' : 'نسخ'}
                </button>
              </div>
              
              <div className="p-6">
                {/* Subject */}
                <div className="mb-6">
                  <label className={cn("block text-sm font-medium mb-1", t.textMuted)}>الموضوع</label>
                  <p className={cn("font-medium", t.textPrimary)}>
                    {preview.subject.replace('{{name}}', customize.contactName || '[الاسم]').replace('{{company}}', customize.companyName || '[الشركة]')}
                  </p>
                </div>

                {/* Email Body */}
                <div className={cn("rounded-lg p-6", t.bgTertiary)}>
                  <pre className={cn("whitespace-pre-wrap text-sm font-sans", t.textSecondary)}>
{generatedEmail}
                  </pre>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-4 border-t flex items-center gap-2">
                  <span className={cn("text-sm", t.textMuted)}>الـ CTA: </span>
                  <span className="text-blue-400 font-medium">{preview.cta}</span>
                </div>
              </div>

              {/* Actions */}
              <div className={cn("px-6 py-4 border-t flex gap-3", t.borderDefault, t.bgTertiary)}>
                <button className={cn("flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border",
                  t.bgSecondary, t.borderDefault, t.textSecondary, t.hover
                )}>
                  <MessageSquare className="w-4 h-4" />
                  تعديل القالب
                </button>
                <button className={cn("flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg", t.accentBg, "text-white", t.accentHover)}>
                  <Send className="w-4 h-4" />
                  حفظ واستخدام
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}