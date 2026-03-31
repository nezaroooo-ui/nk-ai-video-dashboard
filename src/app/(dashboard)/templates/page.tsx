'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
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

const segments = [
  { id: 'ecommerce', name: 'eCommerce', icon: '🛒' },
  { id: 'beauty', name: 'Beauty & Perfume', icon: '✨' },
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
];

const emailTemplates = {
  beauty: {
    subject: '_question about your brand',
    opening: `Hi {{name}},

I came across ${'{company}'} and loved what you're doing with your brand presence.`,
    body: `Your products deserve to be seen in the best light. Most beauty brands we work with are sitting on a goldmine of visual content they don't even know exists.

Here's what I noticed:
- Your products are premium quality
- But your current visuals might not be converting as well as they could

We've helped similar brands in Saudi Arabia increase their engagement by 3-5x with AI-powered video content that's actually affordable.

Would you be open to a quick 5-minute call to see some examples specific to your brand?`,
    cta: 'Book a quick demo',
  },
  ecommerce: {
    subject: '_quick question about {{company}}',
    opening: `Hi {{name}},

I was browsing your store and noticed some great products.`,
    body: `Your product lineup is strong, but here's what I see holding most eCommerce brands back:

Static images only get you so far. Your competitors are using video to showcase products in ways that stop the scroll and drive conversions.

We've helped stores like yours:
- Increase ROAS by 40-60%
- Reduce content production costs by 70%
- Create ads that actually convert

The best part? You don't need a production team.

Want to see what's possible for ${'{company}'}?`,
    cta: 'See examples',
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
Subject: ${preview.subject.replace('{{name}}', customize.contactName || '[Name]').replace('{{company}}', customize.companyName || '[Company]')}

${preview.opening.replace('{{name}}', customize.contactName || '[Name]').replace('{company}', customize.companyName || '[Company]')}

${preview.body.replace('{company}', customize.companyName || '[Company]')}

Best regards,
Nezar Kamel
${'---'}
${preview.cta}
`.trim();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
            <p className="text-gray-500 mt-1">Create and customize outreach templates for each segment</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Send className="w-4 h-4" />
            Send Test Email
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Segment Selection & Customization */}
          <div className="space-y-6">
            {/* Segment Selector */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Select Segment
              </h3>
              <div className="space-y-2">
                {segments.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => handleSegmentChange(segment.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                      selectedSegment === segment.id
                        ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    )}
                  >
                    <span className="text-xl">{segment.icon}</span>
                    <span className="font-medium">{segment.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Customize
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={customize.companyName}
                    onChange={(e) => setCustomize({...customize, companyName: e.target.value})}
                    placeholder="e.g., Luxe Beauty"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    value={customize.contactName}
                    onChange={(e) => setCustomize({...customize, contactName: e.target.value})}
                    placeholder="e.g., Ahmed"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personalization Hook
                  </label>
                  <textarea
                    value={customize.personalization}
                    onChange={(e) => setCustomize({...customize, personalization: e.target.value})}
                    placeholder="Add a specific observation about their brand..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Email Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Preview
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="p-6">
                {/* Subject */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Subject</label>
                  <p className="text-gray-900 font-medium">
                    {preview.subject.replace('{{name}}', customize.contactName || '[Name]').replace('{{company}}', customize.companyName || '[Company]')}
                  </p>
                </div>

                {/* Email Body */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
{generatedEmail}
                  </pre>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">CTA: </span>
                  <span className="text-blue-600 font-medium">{preview.cta}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  <MessageSquare className="w-4 h-4" />
                  Edit Template
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                  Save & Use
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}