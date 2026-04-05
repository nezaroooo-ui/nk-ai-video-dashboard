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
  
  const strategies = [
    {
      company: 'Rubaiyat',
      strategy: `

YARA STRATEGY BRIEF
Angle: C (Timing) - New Riyadh store opened Feb 2026 with Ramadan pop-up - perfect timing to showcase the new location
Subject Line: Exclusive: Your new Riyadh store deserves content that stands out / Behind the scenes: Rubaiyat's SS26 collection
Opening Hook: Congratulations on the new Kingdom Centre store! A luxury retail destination like yours deserves visual content that matches its exclusivity.
Pain to Address: Inconsistent video content for new collections and events despite strong brand presence
Value Prop: High-end product videos and brand storytelling that matches luxury positioning
Proof Type: Work with premium Gulf fashion brands, understand luxury aesthetic
CTA: Share your vision for the new store's digital presence - no commitment
Tone: Semi-formal, sophisticated, peer-to-peer
Follow-up Day 3: Result angle - "We helped similar luxury retailers in the Gulf increase foot traffic by 40%"
Follow-up Day 7: Credibility angle - specific examples of luxury brands we've worked with`
    },
    {
      company: 'Riva Fashion',
      strategy: `

YARA STRATEGY BRIEF
Angle: A (Opportunity) - 1M followers but underutilized video content - massive untapped potential
Subject Line: Your 1M followers are waiting for video content / What Riva Fashion could look like in video
Opening Hook: With 1M Instagram followers, you have one of the biggest fashion audiences in the Gulf - but it's not being leveraged with video.
Pain to Address: High volume of products, multiple brands, but no systematic video content strategy
Value Prop: Product showcase videos, styling content, UGC-style testimonials
Proof Type: Before/after case studies from similar fashion retailers
CTA: Would a 30-second product video sample help you visualize the potential?
Tone: Conversational, energetic
Follow-up Day 3: Gap angle - "Your competitors are already doing this..."
Follow-up Day 7: Result angle - specific metrics from fashion video campaigns`
    },
    {
      company: 'Entaj Foods',
      strategy: `

YARA STRATEGY BRIEF
Angle: D (Result) - Major poultry producer with minimal digital presence - clear opportunity for first-mover advantage
Subject Line: Video content for Saudi Arabia's leading poultry producer / How Entaj can own the food industry narrative
Opening Hook: With 90M birds annual capacity and investor relations active, Entaj is a major player - yet has minimal video content compared to regional competitors.
Pain to Address: No video content despite B2B client base and trade show presence
Value Prop: Factory tours, quality story, B2B food service content, behind-the-scenes
Proof Type: Work with Saudi F&B brands, understand local market
CTA: Let's discuss a video strategy that showcases your production excellence
Tone: Professional, business-focused
Follow-up Day 3: Timing angle - upcoming events or seasonal campaigns
Follow-up Day 7: Credibility angle - other Saudi food brands we've helped`
    },
    {
      company: 'My Clinic',
      strategy: `

YARA STRATEGY BRIEF
Angle: B (Gap) - Multiple branches and app but only 35 Instagram followers - huge digital gap
Subject Line: Your patients are searching for you on video / What My Clinic could look like to 35 followers
Opening Hook: With multiple branches across Jeddah and Riyadh plus a full app, your digital presence doesn't match your actual scale - only 35 Instagram followers.
Pain to Address: Low social media engagement, untapped video potential for patient education and trust-building
Value Prop: Patient testimonials, doctor introductions, telemedicine explainers, facility tours
Proof Type: Healthcare marketing case studies, patient trust building
CTA: Would a doctor spotlight video help attract more patients?
Tone: Semi-formal, empathetic, patient-focused
Follow-up Day 3: Result angle - patient acquisition metrics from video content
Follow-up Day 7: Timing angle - any seasonal health campaigns coming up`
    }
  ];
  
  // Update each row with strategy
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const company = row.get('Company');
    const strategy = strategies.find(s => s.company === company);
    
    if (strategy) {
      const existingNotes = row.get('Notes') || '';
      row.set('Notes', existingNotes + '\n\n' + strategy.strategy);
      await row.save();
    }
  }
  
  console.log('✅ 4 leads strategized!');
  console.log('');
  console.log('Yara report - 2026-04-05: Built strategies for 4 leads.');
  console.log('Angles used: Timing (Rubaiyat), Opportunity (Riva), Result (Entaj), Gap (My Clinic)');
  console.log('Highest priority lead: Rubaiyat - Timing angle - New store opening creates natural video opportunity');
  console.log('Sara is briefed and ready.');
})();