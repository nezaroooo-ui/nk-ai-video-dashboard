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
  
  // Find Leads tab
  const leadsSheet = doc.sheetsByIndex.find(s => s.title === 'ليدز');
  if (!leadsSheet) {
    console.log('Leads sheet not found!');
    return;
  }
  
  // Set headers
  await leadsSheet.setHeaderRow(['التاريخ', 'Company', 'Type', 'Email', 'WhatsApp', 'Source', 'Status', 'Notes']);
  
  const today = new Date().toISOString().split('T')[0];
  
  // Add 5 leads
  const leads = [
    {
      'التاريخ': today,
      'Company': 'Rubaiyat',
      'Type': 'Luxury Fashion',
      'Email': 'care@rubaiyat.com',
      'WhatsApp': '',
      'Source': 'https://rubaiyat.com/pages/customer-care',
      'Status': 'جاهز للإيميل',
      'Notes': 'Major luxury fashion retailer, multiple stores in Jeddah/Riyadh, SS26 collection active, events'
    },
    {
      'التاريخ': today,
      'Company': 'Riva Fashion',
      'Type': 'Fashion Retail',
      'Email': 'wecare@rivafashion.com',
      'WhatsApp': '+965 22216688',
      'Source': 'https://www.rivafashion.com/en-sa/contact',
      'Status': 'الاثنان',
      'Notes': 'Major fashion brand across Gulf, multiple branches, active e-commerce'
    },
    {
      'التاريخ': today,
      'Company': 'Entaj Foods',
      'Type': 'Food & Poultry',
      'Email': 'info@Entaj.com',
      'WhatsApp': '8001220122',
      'Source': 'https://entaj.com/contact/',
      'Status': 'الاثنان',
      'Notes': 'ARASCO subsidiary, major poultry producer KSA, investor relations, strong brand'
    },
    {
      'التاريخ': today,
      'Company': 'My Clinic',
      'Type': 'Medical/Healthcare',
      'Email': 'info@myclinic.com.sa',
      'WhatsApp': '966542228111',
      'Source': 'https://www.myclinic.com.sa/contact-us',
      'Status': 'الاثنان',
      'Notes': 'Multiple branches Jeddah/Riyadh, telemedicine, app, very active healthcare brand'
    },
    {
      'التاريخ': today,
      'Company': 'Kingdom Hospital & Consulting Clinics',
      'Type': 'Medical/Hospital',
      'Email': 'info@khccgroup.com',
      'WhatsApp': '',
      'Source': 'http://kingdomhospital.net/en/contact/',
      'Status': 'جاهز للإيميل',
      'Notes': 'Major hospital in Riyadh, multiple specialties, heart center'
    }
  ];
  
  for (const lead of leads) {
    await leadsSheet.addRow(lead);
  }
  
  console.log('✅ 5 leads uploaded to Google Sheets!');
  console.log('');
  console.log('Mazen report - 2026-04-05: 5 leads uploaded to Google Sheets.');
  console.log('Sectors covered: Fashion (2), Medical (2), Food (1)');
  console.log('Strongest lead today: Rubaiyat - Major luxury retailer with verified customer service email, active events and SS26 campaign');
})();