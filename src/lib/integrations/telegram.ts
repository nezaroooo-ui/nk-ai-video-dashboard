// Telegram Bot integration for founder notifications
// Using Telegram Bot API directly via fetch

interface InlineKeyboardButton {
  text: string;
  callback_data?: string;
  url?: string;
}

interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

interface CallbackQuery {
  data?: string;
  message?: {
    message_id: number;
  };
}

export type ChatType = 'channel' | 'group' | 'private';

export interface TelegramConfig {
  botToken: string;
  channels: {
    reports: string;
    operations: string;
    hotLeads: string;
  };
  adminId: string;
}

export class TelegramClient {
  private botToken: string;
  private channels: TelegramConfig['channels'];
  private apiBase = 'https://api.telegram.org/bot';

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN!;
    this.channels = {
      reports: process.env.TELEGRAM_CHANNEL_REPORTS!,
      operations: process.env.TELEGRAM_CHANNEL_OPERATIONS!,
      hotLeads: process.env.TELEGRAM_CHANNEL_HOT_LEADS!,
    };
  }

  private async sendRequest(method: string, params: Record<string, unknown>): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch(`${this.apiBase}${this.botToken}/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await response.json() as { ok: boolean; result?: { message_id: number }; description?: string };

      if (!data.ok) {
        return { success: false, error: data.description || 'Unknown error' };
      }

      return {
        success: true,
        messageId: data.result?.message_id.toString(),
      };
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Error sending Telegram request:', err);
      return { success: false, error: err.message };
    }
  }

  // Send message to a chat
  async sendMessage(
    chatId: string, 
    text: string, 
    options?: {
      parseMode?: 'Markdown' | 'HTML';
      replyMarkup?: InlineKeyboardMarkup;
    }
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const params: Record<string, unknown> = {
      chat_id: chatId,
      text,
      parse_mode: options?.parseMode || 'Markdown',
    };

    if (options?.replyMarkup) {
      params.reply_markup = options.replyMarkup;
    }

    return this.sendRequest('sendMessage', params);
  }

  // Send morning brief
  async sendMorningBrief(data: {
    leadsAdded: number;
    leadsEnriched: number;
    messagesSent: number;
    replies: number;
    focusSegments: string[];
    blockers?: string[];
  }): Promise<{ success: boolean; error?: string }> {
    const message = `🌅 Good morning, Nezar.

📊 YESTERDAY
• Leads added: ${data.leadsAdded}
• Leads enriched: ${data.leadsEnriched}  
• Messages sent: ${data.messagesSent}
• Replies received: ${data.replies}

🎯 TODAY
• Focus segments: ${data.focusSegments.join(', ')}
• Leads queued for outreach: ${data.leadsEnriched}

⚠️ BLOCKERS
${data.blockers?.length ? data.blockers.join('\n') : 'None'}

🚀 Let's close some deals today.`;

    return this.sendMessage(this.channels.reports, message);
  }

  // Send evening report
  async sendEveningReport(data: {
    date: string;
    totalLeads: number;
    newLeads: number;
    enriched: number;
    sent: number;
    opens: number;
    replies: number;
    replyRate: number;
    positiveReplies: number;
    meetings: number;
    bestSegment: string;
    bestSegmentRate: number;
    bestTemplate: string;
    bestTemplateRate: number;
    topOpportunities: Array<{
      company: string;
      status: string;
      nextAction: string;
    }>;
    needsInput: string[];
  }): Promise<{ success: boolean; error?: string }> {
    const opportunitiesText = data.topOpportunities
      .map((opp, i) => `${i + 1}. ${opp.company}
   → Status: ${opp.status}
   → Next: ${opp.nextAction}`)
      .join('\n\n');

    const needsInputText = data.needsInput.length 
      ? data.needsInput.map(item => `• ${item}`).join('\n')
      : 'None';

    const message = `📊 Daily Report — ${data.date}

══════════════════════════════

📈 PIPELINE
• Total leads: ${data.totalLeads} | New today: ${data.newLeads}
• Enriched: ${data.enriched} | Ready: ${data.enriched}
• Sent: ${data.sent} | Opens: ${data.opens} | Replies: ${data.replies}
• Reply rate: ${data.replyRate}% | Positive: ${data.positiveReplies}

══════════════════════════════

🔥 TOP PERFORMERS
• Segment: ${data.bestSegment} (${data.bestSegmentRate}% reply rate)
• Template: ${data.bestTemplate} (${data.bestTemplateRate}% reply rate)

══════════════════════════════

⭐ TOP OPPORTUNITIES
${opportunitiesText}

══════════════════════════════

⚠️ NEEDS YOUR INPUT
${needsInputText}

══════════════════════════════

System status: ✅ Operational
Next report: Tomorrow 7:30 PM`;

    return this.sendMessage(this.channels.reports, message);
  }

  // Send hot lead alert
  async sendHotLeadAlert(data: {
    company: string;
    contact: string;
    status: string;
    reply: string;
    recommendation: string;
    requiredAction: string;
  }): Promise<{ success: boolean; error?: string }> {
    const message = `🔥 HOT LEAD

Company: ${data.company}
Contact: ${data.contact}
Status: ${data.status}

Their reply:
"${data.reply}"

→ Recommendation: ${data.recommendation}
→ Required from you: ${data.requiredAction}`;

    const keyboard: InlineKeyboardMarkup = {
      inline_keyboard: [
        [
          { text: '📅 Schedule Call', callback_data: `hotlead_${data.company}_schedule` },
          { text: '📝 Send Proposal', callback_data: `hotlead_${data.company}_proposal` },
        ],
        [{ text: '⏰ Remind Later', callback_data: `hotlead_${data.company}_remind` }],
      ],
    };

    return this.sendMessage(this.channels.hotLeads, message, { replyMarkup: keyboard });
  }

  // Send technical alert
  async sendTechnicalAlert(data: {
    component: string;
    status: 'error' | 'critical';
    details: string;
    impact: string;
    resolution?: string;
  }): Promise<{ success: boolean; error?: string }> {
    const emoji = data.status === 'critical' ? '🚨' : '⚠️';
    
    const message = `${emoji} TECHNICAL ISSUE

Component: ${data.component}
Status: ${data.status.toUpperCase()}

Details: ${data.details}
Impact: ${data.impact}
${data.resolution ? `Resolution: ${data.resolution}` : ''}

→ Saleem is working on it`;

    return this.sendMessage(this.channels.operations, message);
  }

  // Send founder request
  async sendFounderRequest(data: {
    id: string;
    type: string;
    priority: string;
    title: string;
    description: string;
    requiredAction: string;
  }): Promise<{ success: boolean; error?: string }> {
    const priorityEmoji = data.priority === 'high' ? '🔴' : data.priority === 'medium' ? '🟡' : '🟢';
    
    const message = `📋 REQUEST #${data.id}

${priorityEmoji} ${data.priority.toUpperCase()} | ${data.type.toUpperCase()}

${data.title}

${data.description}

Required from you:
${data.requiredAction}`;

    const keyboard: InlineKeyboardMarkup = {
      inline_keyboard: [
        [
          { text: '✅ Approve', callback_data: `request_${data.id}_approve` },
          { text: '❌ Reject', callback_data: `request_${data.id}_reject` },
        ],
        [{ text: 'ℹ️ Need Info', callback_data: `request_${data.id}_info` }],
      ],
    };

    return this.sendMessage(this.channels.operations, message, { replyMarkup: keyboard });
  }

  // Handle callback queries (would need webhook setup)
  onCallbackQuery(_callback: (query: CallbackQuery) => void): void {
    console.log('Callback query handler not implemented - requires webhook setup');
  }
}

// Singleton instance
export const telegramClient = new TelegramClient();