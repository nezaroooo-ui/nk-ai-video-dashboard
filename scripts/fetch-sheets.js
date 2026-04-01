const { google } = require('googleapis');
const fs = require('fs');

// Read credentials
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

const auth = new google.auth.JWT(
  'nezar-leads-agent@nezar-leads.iam.gserviceaccount.com',
  null,
  privateKey,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });

async function fetchSheetData() {
  const spreadsheetId = '1IMyPQyWYFD_7a3CtF340pu0LwV-TCU5hXCa8mii7JYE';
  
  try {
    // Get all sheets in the spreadsheet
    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    console.log('Available sheets:', meta.data.sheets.map(s => s.properties.title));
    
    // Get data from each sheet
    for (const sheet of meta.data.sheets) {
      const title = sheet.properties.title;
      console.log(`\n=== ${title} ===`);
      
      const result = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: title,
      });
      
      const rows = result.data.values;
      if (rows && rows.length > 0) {
        console.log(`Total rows: ${rows.length}`);
        console.log('Headers:', rows[0].slice(0, 5));
        console.log('First row:', rows[1]?.slice(0, 5));
      } else {
        console.log('Empty');
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchSheetData();