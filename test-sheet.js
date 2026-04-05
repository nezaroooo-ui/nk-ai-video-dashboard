require('dotenv').config({ path: '.env.local' });
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('13lzfNeQpbKXOTmCnwI1I3cE4LA0tQEKg6TN6Tu4SYAQ', auth);

(async () => {
  await doc.loadInfo();
  console.log('Current sheets:', doc.sheetsByIndex.map(s => s.title));
  
  // Create tabs if they don't exist
  const tabs = ['ذاكرة', 'ليدز', 'تقارير'];
  
  for (const tabName of tabs) {
    const exists = doc.sheetsByIndex.find(s => s.title === tabName);
    if (!exists) {
      await doc.addSheet({ title: tabName });
      console.log('Created tab: ' + tabName);
    }
  }
  
  // Reload to get new sheets
  await doc.loadInfo();
  console.log('Updated sheets:', doc.sheetsByIndex.map(s => s.title));
  
  // Now add the first row to ذاكرة
  const memorySheet = doc.sheetsByIndex.find(s => s.title === 'ذاكرة');
  if (memorySheet) {
    // Set headers first
    await memorySheet.setHeaderRow(['التاريخ', 'الوكيل', 'المهمة المنجزة', 'القرارات المتخذة', 'المهام المعلقة', 'ملاحظات']);
    console.log('Headers set');
    
    // Add data row
    const today = new Date().toISOString().split('T')[0];
    await memorySheet.addRow({
      'التاريخ': today,
      'الوكيل': 'Kareem',
      'المهمة المنجزة': 'System initialized - company renamed to NK-AI Video - MEMORY.md updated - Google Sheets linked',
      'القرارات المتخذة': 'Use local memory for session context, Google Sheets for leads and reports',
      'المهام المعلقة': 'Update all agent prompts with NK-AI Video identity',
      'ملاحظات': 'System rebuild started with Nizar'
    });
    console.log('✅ Row added to ذاكرة tab!');
  }
})();