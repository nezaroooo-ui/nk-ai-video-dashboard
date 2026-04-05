// Google Sheets integration - Production ready
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const SPREADSHEET_ID = '13lzfNeQpbKXOTmCnwI1I3cE4LA0tQEKg6TN6Tu4SYAQ';
const SERVICE_ACCOUNT_EMAIL = 'nezar-leads-agent@nezar-leads.iam.gserviceaccount.com';

// Fallback private key if env var is not available
const FALLBACK_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCT/Go1B28xffFt
S6wJU9ynwHpFHW+J/TSp7Ih542pMl3xdVla9dLApS0RjutMnFp3Nk0kTQF1h6ffd
iszhcaLLk8X3zJI3nUuiEM0xU2e4u3a2UwdvFlye4cG8vSLUuqtRBHbYHbxPKl0q
+MaBl4eAhgkiOzZyO0RG+Uxp08pdvcntKOdPlNxZp5GnMy0YUQz7i9PSWemXiM9G
0edeRoL04TA+35WS/gmmCUEI8yvHuTicLgywLl3Bz0dKAgZhYNShNCvi8os2FcbI
8iN7sUf0bAlwAe0idLkNrXZVwL2Gw80LlcohC5dZ7DumkgAiLRHhYPBvr8TaibdK
SKFOu5HvAgMBAAECggEAJbliT6tZ/plW6qAwNl6A8OiBos3Kqbf47VpFPiEpb2Xs
h5SjXv94isZLpEqzWhMLXiTuK3CsfXHZxEmGSfAgaln8zNsC6Rd5eNJkpG7ZEYAE
Vp0a14gxSzVMoHLshqMhWfFT5GrMHrgzcOljHRUGL0671FSY4AzYrmkNwCqDu1pr
eYPbCenPGW1oWCSl6CmggEFiZxg0efcNRWwlWI3pHWHVpj1Xnss0T9Hmjc2ynhuz
iz70pZy3VDsPHd4n2otdu4qO51KiHq97VV1Tuw9cgDBgqdh97yjBePst1XWDFSPz
fYFs+u5l9Z7CD6dx8X0VkXOtBiPi0c28diMFyV69gQKBgQDFG83T3JYnfdhVknXr
HYNI6rdmF/Ko+AaJ57K50mTZdmqbwdqS3etrQQQ6qLZucrJuf4GUKAryvuiMpAra
7QBxigY7ydJ7UmMgMnkUk6wVZppxIf0C/tEb7UhUy6fyqmdqP0ULwrny/8qXb1WH
laQDnVPllj6Q7PWyVjczpMPWbwKBgQDAM2HLYRWRmoQ4/CNBzHkYE/UgVIBQDwwb
2nAcpEPEdWpf3eLtBcyJIBl33YpSsyFR0Q99/GIy4+lWHtMQgWAB5VIEgr21uMh+
cWFUGcwAhbrXjG/ElE0kVh3RoDvb/W+ViNMrNHUSQjs0q6u5i0k9m1omZV52hUF7
y7jMlB28gQKBgFzmyu9lU5xPcyx5+HwVj/BJOKG0/dln9WUAQLvWj1PzvTGmf8ej
Mzd9EGo5ZKrQAouUK1XSPb7F/kNzee5PsFrTTDbX3A3l+fSN9YWeSIhZsMdL1r2X
rqV0BBh7WLBGYrGwGnH9mLkQmMMhZXWfMQvHFmjqlJioJvGkMyZzLR6fAoGBALLU
nB+R23G4pWIoJ93nFJz0pNVKCoFzHr8jxcDAjlVTMoC0gZosFR1ZgpjmxvcfuNbZ
gGKm2++h48+/qn7nAZ+B8YhE5aMZpWMQt5B62Dd8NvasUqpDmms+vUv4nPmZm6M0
xdajXnJ4sYHWYVeoY6Mw0vZ6xyPb5Qv8h5vCDNEBAoGAb4Izq2cwdzyAHCUCemcN
gne0OW+nLUZrvAYiaAXKXp6kzWrNkPkNTxlWqx6nz5OBMpHNSWcw1VSfhqOJb7d3
56VezLPu/6dGq3byTPhjn/3gVgQfqOnRbJGh6P58LVcOzdvJD+Dmvo07T20QPnf+
gUbNf8KXtF7LUys5ptw5nBw=
-----END PRIVATE KEY-----`;

// Get the private key - prefer env var, fallback to hardcoded
const getPrivateKey = () => {
  const envKey = process.env.GOOGLE_PRIVATE_KEY;
  if (envKey && envKey.includes('BEGIN PRIVATE KEY')) {
    return envKey.replace(/\\n/g, '\n');
  }
  console.log('Using fallback private key');
  return FALLBACK_PRIVATE_KEY;
};

class GoogleSheetsService {
  private auth: any;
  private sheets: any;

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: SERVICE_ACCOUNT_EMAIL,
        private_key: getPrivateKey(),
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
    // Try "ليدز" tab first (Arabic), fallback to "Leads" or "Master Leads"
    let data = await this.getSheetData('ليدز');
    if (data.length < 2) data = await this.getSheetData('Leads');
    if (data.length < 2) data = await this.getSheetData('Master Leads');
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

  // Get daily stats - Updated for NK-AI Video Arabic sheet
  async getDailyStats() {
    // Get leads from ليدز tab
    let leadsData = await this.getSheetData('ليدز');
    if (leadsData.length < 2) leadsData = await this.getSheetData('Leads');
    if (leadsData.length < 2) leadsData = await this.getSheetData('Master Leads');
    
    // Get memory/activity from ذاكرة tab
    let memoryData = await this.getSheetData('ذاكرة');
    if (memoryData.length < 2) memoryData = await this.getSheetData('Memory');
    
    // Get reports from تقارير tab
    let reportsData = await this.getSheetData('تقارير');
    if (reportsData.length < 2) reportsData = await this.getSheetData('Reports');
    
    const today = new Date().toISOString().split('T')[0];
    
    // Parse leads - map Arabic column names
    let leads: any[] = [];
    if (leadsData.length >= 2) {
      const headers = leadsData[0].map((h: string) => h?.toLowerCase().replace(/\s+/g, '_') || '');
      leadsData.slice(1).forEach((row: any[]) => {
        const lead: any = {};
        headers.forEach((header: string, idx: number) => {
          lead[header] = row[idx] || '';
        });
        // Also map common Arabic headers
        lead.company = lead.company || lead['company_name'] || lead['company'] || lead['الشركة'] || '';
        lead.email = lead.email || lead['البريد'] || lead['email'] || '';
        lead.status = lead.status || lead['الحالة'] || lead['status'] || '';
        leads.push(lead);
      });
    }
    
    // Count by status
    const sent = leads.filter((l: any) => l.status?.includes('أُرسل') || l.status?.includes('Sent')).length;
    const replied = leads.filter((l: any) => l.status?.includes('رد') || l.status?.includes('replied')).length;
    const hot = leads.filter((l: any) => l.status?.includes('ساخن') || l.status?.includes('hot')).length;
    const warm = leads.filter((l: any) => l.status?.includes('دافئ') || l.status?.includes('warm')).length;
    
    // Parse recent activity
    let recentActivity: any[] = [];
    if (memoryData.length >= 2) {
      const memHeaders = memoryData[0].map((h: string) => h?.toLowerCase() || '');
      recentActivity = memoryData.slice(-10).reverse().map((row: any[]) => {
        const entry: any = {};
        memHeaders.forEach((header: string, idx: number) => {
          entry[header] = row[idx] || '';
        });
        return entry;
      });
    }
    
    // Parse reports
    let weeklyTrend = { leadsFound: 0, emailsSent: 0, replies: 0, warmLeads: 0, hotLeads: 0 };
    if (reportsData.length >= 2) {
      const reportHeaders = reportsData[0];
      reportsData.slice(-1).forEach((row: any[]) => {
        weeklyTrend.leadsFound = parseInt(row[1]) || 0;
        weeklyTrend.emailsSent = parseInt(row[3]) || 0;
        weeklyTrend.replies = parseInt(row[4]) || 0;
      });
    }
    
    return {
      totalLeads: leads.length,
      newLeadsToday: leads.filter((l: any) => l['التاريخ']?.includes(today)).length,
      overview: {
        totalLeads: leads.length,
        emailsSent: sent,
        replies: replied,
        hotLeads: hot,
        warmLeads: warm
      },
      pipelineByStage: {
        'جديد (New)': leads.filter((l: any) => l.status?.includes('جديد') || !l.status).length,
        'مُثرى (Enriched)': leads.filter((l: any) => l.status?.includes('مُثرى')).length,
        'Sent': sent,
        'Replied': replied,
        'Warm': warm,
        'Hot': hot,
        'Not Interested': leads.filter((l: any) => l.status?.includes('لا يوجد') || l.status?.includes('Not')).length
      },
      weeklyTrend,
      recentActivity,
      alerts: leads.filter((l: any) => l.status?.includes('ساخن') || l.status?.includes('Hot')),
      stats: {
        totalLeads: leads.length,
        newLeadsToday: leads.filter((l: any) => l['التاريخ']?.includes(today)).length,
        pipeline: {
          total: leads.length,
          sent,
          replied,
          interested: warm + hot
        }
      }
    };
  }
}

export const sheetsService = new GoogleSheetsService();
export default sheetsService;