// Script to create Google Sheets tabs and headers
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Direct values - replace these
const SPREADSHEET_ID = '1IMyPQyWYFD_7a3CtF340pu0LwV-TCU5hXCa8mii7JYE';
const SERVICE_ACCOUNT_EMAIL = 'nezar-leads-agent@nezar-leads.iam.gserviceaccount.com';
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
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
gGKm2++h48+/qn7nAZ+B8YhE5aMZpWMQt5B62Dd8NlasUqpDmms+vUv4nPmZm6M0
xdajXnJ4sYHWYVeoY6Mw0vZ6xyPb5Qv8h5vCDNEBAoGAb4Izq2cwdzyAHCUCemcN
gne0OW+nLUZrvAYiaAXKXp6kzWrNkPkNTxlWqx6nz5OBMpHNSWcw1VSfhqOJb7d3
56VezLPu/6dGq3byTPhjn/3gVgQfqOnRbJGh6P58LVcOzdvJD+Dmvo07T20QPnf+
gUbNf8KXtF7LUys5ptw5nBw=
-----END PRIVATE KEY-----`.replace(/\\n/g, '\n');

const sheetsToCreate = [
  {
    title: 'Master Leads',
    headers: [
      'Lead ID', 'Company Name', 'Website', 'Industry', 'Country', 
      'Contact Name', 'Role', 'Email', 'LinkedIn', 'Instagram', 
      'Source', 'Segment', 'Initial Notes', 'Research Date', 'Initial Tier', 'Owner Agent'
    ]
  },
  {
    title: 'Lead Insights',
    headers: [
      'Insight ID', 'Lead ID', 'Pain Point', 'Opportunity Angle', 
      'Recommended Offer', 'Personalization Hook', 'Relevance Score', 
      'Priority Reason', 'Current Content Weakness', 'Competitor Observation',
      'Insight Date', 'Enriched By'
    ]
  },
  {
    title: 'Pipeline',
    headers: [
      'Pipeline ID', 'Lead ID', 'Current Status', 'Channel', 'Last Contact Date',
      'Template Used', 'Subject Line', 'Follow-up Count', 'Last Response Type',
      'Next Action', 'Next Action Date', 'Assigned Agent', 'Notes', 'Updated At', 'Updated By'
    ]
  },
  {
    title: 'Message Library',
    headers: [
      'Template ID', 'Segment', 'Offer Type', 'Variant Name', 'Channel',
      'Subject Line', 'Opening Line', 'Main Body', 'CTA', 'Status',
      'Performance Notes', 'Created At', 'Updated At', 'Created By'
    ]
  },
  {
    title: 'Daily Reports',
    headers: [
      'Report ID', 'Date', 'Leads Added', 'Leads Enriched', 'Messages Approved',
      'Messages Sent', 'Opens', 'Replies', 'Positive Replies', 'Meetings',
      'Best Segment', 'Best Segment Reply Rate', 'Best Template', 
      'Best Template Reply Rate', 'Notes', 'Created At'
    ]
  },
  {
    title: 'Activity Log',
    headers: [
      'Activity ID', 'Agent Name', 'Action Type', 'Target Type', 'Target ID',
      'Description', 'Status', 'Error Message', 'Duration Ms', 'Timestamp'
    ]
  }
];

async function setupSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: SERVICE_ACCOUNT_EMAIL,
      private_key: PRIVATE_KEY,
    },
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: 'v4', auth });

  console.log('Setting up Google Sheets...');
  console.log('Spreadsheet ID:', SPREADSHEET_ID);

  try {
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    console.log('✅ Sheet found:', spreadsheet.data.properties?.title);
    
    const existingSheets = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];
    console.log('Existing sheets:', existingSheets);
    
    for (const sheet of sheetsToCreate) {
      if (!existingSheets.includes(sheet.title)) {
        console.log(`Creating sheet: ${sheet.title}...`);
        
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [{
              addSheet: {
                properties: { title: sheet.title }
              }
            }]
          }
        });
        
        const lastCol = String.fromCharCode(64 + sheet.headers.length);
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheet.title}!A1:${lastCol}1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [sheet.headers] }
        });
        
        console.log(`✅ Created ${sheet.title} with headers`);
      } else {
        console.log(`✅ ${sheet.title} already exists`);
      }
    }
    
    console.log('\n🎉 All sheets setup complete!');
    console.log('\nSheets created:');
    sheetsToCreate.forEach(s => console.log(`  - ${s.title}`));
    
  } catch (error: any) {
    console.error('❌ Error:', error.message || error);
  }
}

setupSheets();