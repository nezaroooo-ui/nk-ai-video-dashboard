// Google Sheets integration - Production ready
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const SPREADSHEET_ID = '1IMyPQyWYFD_7a3CtF340pu0LwV-TCU5hXCa8mii7JYE';
const SERVICE_ACCOUNT_EMAIL = 'nezar-leads-agent@nezar-leads.iam.gserviceaccount.com';
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || '';

class GoogleSheetsService {
  private auth: any;
  private sheets: any;

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: SERVICE_ACCOUNT_EMAIL,
        private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: SCOPES,
    });
    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  // Read data from a sheet
  async getSheetData(sheetName: string): Promise<any[][]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A:Z`,
      });
      return response.data.values || [];
    } catch (error) {
      console.error(`Error reading ${sheetName}:`, error);
      return [];
    }
  }

  // Write data to a sheet
  async writeSheetData(sheetName: string, data: any[][]): Promise<boolean> {
    try {
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: data },
      });
      return true;
    } catch (error) {
      console.error(`Error writing to ${sheetName}:`, error);
      return false;
    }
  }

  // Append row to sheet
  async appendRow(sheetName: string, data: any[]): Promise<boolean> {
    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A:A`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [data] },
      });
      return true;
    } catch (error) {
      console.error(`Error appending to ${sheetName}:`, error);
      return false;
    }
  }

  // Get leads with enrichment data
  async getLeads() {
    const data = await this.getSheetData('Master Leads');
    if (data.length < 2) return [];
    
    const headers = data[0];
    const rows = data.slice(1);
    
    return rows.map(row => {
      const lead: any = {};
      headers.forEach((header, index) => {
        lead[header.toLowerCase().replace(/ /g, '_')] = row[index] || '';
      });
      return lead;
    });
  }

  // Get pipeline data
  async getPipeline() {
    const data = await this.getSheetData('Pipeline');
    if (data.length < 2) return [];
    
    const headers = data[0];
    const rows = data.slice(1);
    
    return rows.map(row => {
      const record: any = {};
      headers.forEach((header, index) => {
        record[header.toLowerCase().replace(/ /g, '_')] = row[index] || '';
      });
      return record;
    });
  }

  // Get daily stats
  async getDailyStats() {
    const leads = await this.getLeads();
    const pipeline = await this.getPipeline();
    
    const today = new Date().toISOString().split('T')[0];
    
    return {
      totalLeads: leads.length,
      newLeadsToday: leads.filter((l: any) => l.research_date?.includes(today)).length,
      pipeline: {
        total: pipeline.length,
        sent: pipeline.filter((p: any) => p.current_status === 'sent').length,
        replied: pipeline.filter((p: any) => p.current_status === 'replied').length,
        interested: pipeline.filter((p: any) => p.current_status === 'interested').length,
      }
    };
  }
}

export const sheetsService = new GoogleSheetsService();
export default sheetsService;