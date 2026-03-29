// Gmail integration for sending outreach emails
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

export class GmailClient {
  private gmail: ReturnType<typeof google.gmail>;
  private fromName: string;
  private fromEmail: string;
  private dailyLimit: number;
  private sentToday: number = 0;

  constructor() {
    const auth = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );

    auth.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    this.gmail = google.gmail({ version: 'v1', auth });
    this.fromName = process.env.GMAIL_FROM_NAME || 'Nezar Kamel';
    this.fromEmail = process.env.GMAIL_FROM_EMAIL || '';
    this.dailyLimit = parseInt(process.env.GMAIL_DAILY_LIMIT || '50');
  }

  // Create email message
  private createEmailMessage(to: string, subject: string, body: string): string {
    const message = [
      `To: ${to}`,
      `From: ${this.fromName} <${this.fromEmail}>`,
      `Subject: ${subject}`,
      'Content-Type: text/plain; charset=UTF-8',
      '',
      body,
    ].join('\n');

    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // Create HTML email with tracking
  private createHtmlEmail(to: string, subject: string, htmlBody: string, leadId: string): string {
    const trackingPixel = `https://${process.env.NEXT_PUBLIC_DOMAIN}/api/tracking/open?lead=${leadId}`;
    
    const html = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto;">
            ${htmlBody}
            <img src="${trackingPixel}" width="1" height="1" alt="" style="display:none;" />
          </div>
        </body>
      </html>
    `;

    const message = [
      `To: ${to}`,
      `From: ${this.fromName} <${this.fromEmail}>`,
      `Subject: ${subject}`,
      'Content-Type: text/html; charset=UTF-8',
      '',
      html,
    ].join('\n');

    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // Check if we can send
  canSend(): boolean {
    return this.sentToday < this.dailyLimit;
  }

  // Get remaining quota
  getRemainingQuota(): number {
    return Math.max(0, this.dailyLimit - this.sentToday);
  }

  // Send email
  async sendEmail(to: string, subject: string, body: string, htmlBody?: string, leadId?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.canSend()) {
      return { success: false, error: 'Daily limit reached' };
    }

    try {
      const message = htmlBody && leadId 
        ? this.createHtmlEmail(to, subject, htmlBody, leadId)
        : this.createEmailMessage(to, subject, body);

      const response = await this.gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: message,
        },
      });

      this.sentToday++;
      
      return {
        success: true,
        messageId: response.data.id || undefined,
      };
    } catch (error: unknown) {
      const err = error as { code?: number; message?: string };
      console.error('Error sending email:', err);
      
      // Handle rate limiting
      if (err.code === 429) {
        return { success: false, error: 'Rate limit exceeded' };
      }
      
      return { success: false, error: err.message || 'Unknown error' };
    }
  }

  // Send bulk emails
  async sendBulk(emails: Array<{ to: string; subject: string; body: string; htmlBody?: string; leadId?: string }>): Promise<Array<{ to: string; success: boolean; messageId?: string; error?: string }>> {
    const results = [];
    
    for (const email of emails) {
      if (!this.canSend()) {
        results.push({ to: email.to, success: false, error: 'Daily limit reached' });
        continue;
      }
      
      const result = await this.sendEmail(email.to, email.subject, email.body, email.htmlBody, email.leadId);
      results.push({ to: email.to, ...result });
      
      // Respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second between emails
    }
    
    return results;
  }

  // Check bounce status (would need to poll or use webhooks in production)
  async checkBounces(): Promise<string[]> {
    // Placeholder - would implement bounce detection
    return [];
  }

  // Reset daily counter (called at start of day)
  resetDailyCounter(): void {
    this.sentToday = 0;
  }
}

// Singleton instance
export const gmailClient = new GmailClient();