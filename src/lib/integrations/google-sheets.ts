// Google Sheets integration for v1 data layer
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export class GoogleSheetsClient {
  private sheets: ReturnType<typeof google.sheets>;
  private spreadsheetId: string;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: SCOPES,
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SHEETS_ID!;
  }

  // Read all values from a sheet
  async getSheetValues(range: string): Promise<string[][]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });
      return response.data.values || [];
    } catch (error) {
      console.error('Error reading from sheet:', error);
      throw error;
    }
  }

  // Write values to a sheet
  async writeSheetValues(range: string, values: string[][], majorDimension: 'ROWS' | 'COLUMNS' = 'ROWS'): Promise<void> {
    try {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          majorDimension,
          values,
        },
      });
    } catch (error) {
      console.error('Error writing to sheet:', error);
      throw error;
    }
  }

  // Append values to a sheet
  async appendSheetValues(range: string, values: string[][]): Promise<void> {
    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });
    } catch (error) {
      console.error('Error appending to sheet:', error);
      throw error;
    }
  }

  // Get all leads
  async getLeads(): Promise<string[][]> {
    return this.getSheetValues('Master Leads!A:P');
  }

  // Add a new lead
  async addLead(values: string[]): Promise<void> {
    await this.appendSheetValues('Master Leads!A:P', [values]);
  }

  // Get lead insights
  async getLeadInsights(): Promise<string[][]> {
    return this.getSheetValues('Lead Insights!A:L');
  }

  // Add lead insight
  async addLeadInsight(values: string[]): Promise<void> {
    await this.appendSheetValues('Lead Insights!A:L', [values]);
  }

  // Get pipeline records
  async getPipeline(): Promise<string[][]> {
    return this.getSheetValues('Pipeline!A:P');
  }

  // Update pipeline record
  async updatePipeline(rowNumber: number, values: string[]): Promise<void> {
    await this.writeSheetValues(`Pipeline!A${rowNumber}:P${rowNumber}`, [values]);
  }

  // Get message templates
  async getMessageTemplates(): Promise<string[][]> {
    return this.getSheetValues('Message Library!A:N');
  }

  // Add message template
  async addMessageTemplate(values: string[]): Promise<void> {
    await this.appendSheetValues('Message Library!A:N', [values]);
  }

  // Get daily reports
  async getDailyReports(): Promise<string[][]> {
    return this.getSheetValues('Daily Reports!A:P');
  }

  // Add daily report
  async addDailyReport(values: string[]): Promise<void> {
    await this.appendSheetValues('Daily Reports!A:P', [values]);
  }

  // Get activity log
  async getActivityLog(): Promise<string[][]> {
    return this.getSheetValues('Activity Log!A:K');
  }

  // Log activity
  async logActivity(values: string[]): Promise<void> {
    await this.appendSheetValues('Activity Log!A:K', [values]);
  }
}

// Singleton instance
export const sheetsClient = new GoogleSheetsClient();