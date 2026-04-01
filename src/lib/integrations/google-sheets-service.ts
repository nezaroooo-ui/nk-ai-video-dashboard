// Google Sheets integration - Production ready
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const SPREADSHEET_ID = '1IMyPQyWYFD_7a3CtF340pu0LwV-TCU5hXCa8mii7JYE';
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