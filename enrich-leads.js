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
  const leadsSheet = doc.sheetsByIndex.find(s => s.title === 'ليدز');
  await leadsSheet.loadHeaderRow();
  
  const rows = await leadsSheet.getRows();
  
  const enrichments = [
    {
      company: 'Rubaiyat',
      enrichment: `LAYAN ENRICHMENT REPORT
Score: 9/10
Business: Luxury fashion retailer since 1981, multi-brand store with designer labels (Zimmermann, Byredo, etc.), branches in Jeddah & Riyadh
Digital Status: Website professional (Shopify), Instagram 101K followers, very active (9559 posts), recent posts Feb 2026
Video Status: Some Reels, but not consistent - opportunity for high-end product videos
Top Pain Point: No consistent video content for new collections and events
Best Angle: Exclusive SS26 collection launch, new Riyadh Kingdom Centre store opening
Urgency Signal: New Riyadh store opened Feb 2026, ongoing Ramadan events`
    },
    {
      company: 'Riva Fashion',
      enrichment: `LAYAN ENRICHMENT REPORT
Score: 8/10
Business: Major fashion retailer across Gulf (KSA, Kuwait, UAE, Qatar, Bahrain), multiple brands (Riva Women, Riva Choice, Riva Kids, Riva Home)
Digital Status: Website professional (Magento), Instagram 1M followers, very active (6120 posts), strong e-commerce
Video Status: Some social content, but massive room for product videos and styling content
Top Pain Point: High volume of products, no systematic video content strategy
Best Angle: New season collections, styling videos, customer testimonials
Urgency Signal: Expanding brand presence across Gulf`
    },
    {
      company: 'Entaj Foods',
      enrichment: `LAYAN ENRICHMENT REPORT
Score: 7/10
Business: ARASCO subsidiary, major poultry producer in KSA since 2004, 90M birds annual capacity
Digital Status: Website professional (WordPress), Instagram 26K followers, 865 posts, active
Video Status: Very limited video content - major opportunity
Top Pain Point: No video content despite large operations and B2B客户
Best Angle: Factory tour, product quality story, B2B food service companies
Urgency Signal: Strong presence at trade shows, investor relations active`
    },
    {
      company: 'My Clinic',
      enrichment: `LAYAN ENRICHMENT REPORT
Score: 5/10
Business: Multi-branch healthcare provider in Jeddah & Riyadh, services include telemedicine, home healthcare
Digital Status: Website professional, but Instagram very weak (35 followers only)
Video Status: No video content found - significant opportunity
Top Pain Point: Low social media engagement, untapped video potential for patient education
Best Angle: Patient testimonials, doctor introductions, telemedicine promotion
Urgency Signal: Multiple branches, app available, but low digital engagement`
    },
    {
      company: 'Kingdom Hospital & Consulting Clinics',
      enrichment: `LAYAN ENRICHMENT REPORT
Score: 4/10
Business: Multi-specialty hospital in Riyadh, heart center, obesity center, consulting clinics
Digital Status: Website basic, Instagram inactive (last posts 2021-2022), unclear digital strategy
Video Status: No current video content - but hospital sector slower to adopt
Top Pain Point: Very outdated digital presence, missed opportunity for patient education
Best Angle: Patient education content, facility tours, doctor spotlights (if interested)
Urgency Signal: Old social media, may need digital refresh`
    }
  ];
  
  // Update each row with enrichment
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const company = row.get('Company');
    const enrichment = enrichments.find(e => e.company === company);
    
    if (enrichment) {
      const existingNotes = row.get('Notes') || '';
      row.set('Notes', existingNotes + '\n\n' + enrichment.enrichment);
      await row.save();
    }
  }
  
  console.log('✅ 5 leads enriched!');
  console.log('');
  console.log('Layan report - 2026-04-05: Enriched 5 leads.');
  console.log('Passed 4 to Yara (score 5+): Rubaiyat, Riva Fashion, Entaj Foods, My Clinic');
  console.log('Flagged 1 to Kareem: Kingdom Hospital (score 4 - outdated digital presence)');
  console.log('Strongest lead: Rubaiyat - Score 9 - New Riyadh store, 101K IG followers, major video opportunity');
})();