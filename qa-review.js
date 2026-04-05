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
  
  // QA Reviews for each email
  const qaReviews = [
    {
      company: 'Rubaiyat',
      review: `

HALA QA REVIEW - Rubaiyat
═══════════════════════════════════════════
Layer 1: Content Quality
✓ Opening Line: PASS - Specific observation about new store
✓ Body: PASS - One clear pain point (no video for exclusivity), Nizar's background mentioned naturally
✓ CTA: PASS - "Would sharing some ideas help?" - low friction, question format
✓ Human Test: PASS - Feels specific, not template

Layer 2: Deliverability
✓ Subject: 6 words - PASS
✓ No spam words - PASS
✓ No all caps - PASS
✓ No excessive punctuation - PASS
✓ No links in first email - PASS
✓ No attachments - PASS
✓ No pricing - PASS
✓ Plain text friendly - PASS

Layer 3: Brand Consistency
✓ Professional tone for luxury sector - PASS
✓ Nizar positioned as marketing expert - PASS

Banned Phrases: NONE FOUND

HALA QA APPROVED - Rubaiyat ✅
Content: PASS
Deliverability: PASS
Brand: PASS
Notes: Strong opening, good use of "SS26 collection" reference
Ready for Adham.
      `
    },
    {
      company: 'Riva Fashion',
      review: `

HALA QA REVIEW - Riva Fashion
═══════════════════════════════════════════
Layer 1: Content Quality
✓ Opening Line: PASS - Specific observation about 1M followers
✓ Body: PASS - Clear opportunity, Nizar's background mentioned
✓ CTA: PASS - "Would a quick sample help?" - low friction
✓ Human Test: PASS - Specific and relevant

Layer 2: Deliverability
✓ Subject: 6 words - PASS
✓ No spam words - PASS
✓ No all caps - PASS
✓ No excessive punctuation - PASS
✓ No links in first email - PASS
✓ No attachments - PASS
✓ No pricing - PASS
✓ Plain text friendly - PASS

Layer 3: Brand Consistency
✓ Appropriate for fashion/retail - PASS
✓ Marketing expert positioning - PASS

Banned Phrases: NONE FOUND

HALA QA APPROVED - Riva Fashion ✅
Content: PASS
Deliverability: PASS
Brand: PASS
Notes: Good balance of opportunity + specificity
Ready for Adham.
      `
    },
    {
      company: 'Entaj Foods',
      review: `

HALA QA REVIEW - Entaj Foods
═══════════════════════════════════════════
Layer 1: Content Quality
✓ Opening Line: PASS - Specific about 90M capacity and investor relations
✓ Body: PASS - B2B focus, production excellence angle
✓ CTA: PASS - "Would discussing... make sense?" - professional, low friction
✓ Human Test: PASS - Feels B2B appropriate

Layer 2: Deliverability
✓ Subject: 8 words - PASS (at limit)
✓ No spam words - PASS
✓ No all caps - PASS
✓ No excessive punctuation - PASS
✓ No links in first email - PASS
✓ No attachments - PASS
✓ No pricing - PASS
✓ Plain text friendly - PASS

Layer 3: Brand Consistency
✓ B2B appropriate tone - PASS
✓ Nizar positioned as marketing expert - PASS

Banned Phrases: NONE FOUND

HALA QA APPROVED - Entaj Foods ✅
Content: PASS
Deliverability: PASS
Brand: PASS
Notes: Professional B2B tone
Ready for Adham.
      `
    },
    {
      company: 'My Clinic',
      review: `

HALA QA REVIEW - My Clinic
═══════════════════════════════════════════
Layer 1: Content Quality
✓ Opening Line: PASS - Specific about 35 followers vs multiple branches
✓ Body: PASS - Trust-building angle for healthcare
✓ CTA: PASS - "Would a doctor spotlight video help?" - specific, low friction
✓ Human Test: PASS - Patient-focused, appropriate

Layer 2: Deliverability
✓ Subject: 6 words - PASS
✓ No spam words - PASS
✓ No all caps - PASS
✓ No excessive punctuation - PASS
✓ No links in first email - PASS
✓ No attachments - PASS
✓ No pricing - PASS
✓ Plain text friendly - PASS

Layer 3: Brand Consistency
✓ Healthcare-appropriate tone - PASS
✓ Trust/credibility angle - PASS

Banned Phrases: NONE FOUND

HALA QA APPROVED - My Clinic ✅
Content: PASS
Deliverability: PASS
Brand: PASS
Notes: Good trust-building angle for healthcare
Ready for Adham.
      `
    }
  ];
  
  // Update each row with QA review
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const company = row.get('Company');
    const review = qaReviews.find(r => r.company === company);
    
    if (review) {
      const existingNotes = row.get('Notes') || '';
      row.set('Notes', existingNotes + '\n\n' + review.review);
      await row.save();
    }
  }
  
  console.log('✅ All 4 emails QA approved!');
  console.log('');
  console.log('Hala report - 2026-04-05: Reviewed 4 emails.');
  console.log('Approved: 4');
  console.log('Rejected: 0');
  console.log('');
  console.log('All emails ready for Adham to send.');
})();