import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Professional funnel with all your details
const COMPANY_INFO = {
  name: 'نايزر كامل',
  title: 'مؤسس وح strategist',
  company: 'Nezar Leads',
  website: 'https://nezarkamel.com/',
  instagram: 'https://www.instagram.com/nezarkamelai/',
  snapchat: 'https://www.snapchat.com/@nezarkamelai',
  twitter: 'https://x.com/nezarkamel_AI',
  youtube: 'https://www.youtube.com/@nezarkamel-AI',
  threads: 'https://www.threads.com/@nezarkamelai'
};

// A/B Test Subject Lines
const SUBJECT_LINES = {
  initial: [
    'فكرة لنمو متجرك {company}',
    '{company} + محتوى فيديو احترافي',
    'كيف يقود قطاعك السوق السعودي؟',
    'سؤال حول علامتكم التجارية'
  ],
  followup: [
    'متابعة: فكرة لنمو {company}',
    'regarding {company}',
    'فرصة للنمو - {company}'
  ],
  value: [
    'ملاحظة سريعة حول {company}',
    'سؤال regarding {company}',
    'شيء مهم حول متجركم'
  ],
  final: [
    'آخر رسالة - عرض متجركم',
    'regarding {company} - الأخير',
    'إذا احتجتم مساعدة مستقبلاً'
  ]
};

// Get random subject line for A/B testing
const getSubject = (type: string, companyName: string) => {
  const subjects = SUBJECT_LINES[type as keyof typeof SUBJECT_LINES] || SUBJECT_LINES.initial;
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  return subject.replace('{company}', companyName);
};

// Email Templates
const templates = {
  initial: (companyName: string) => `
مرحباً فريق ${companyName}،

أتمنى أن تكونوا بخير.

تابعنا عن كثب نمو متجركم في السوق السعودي، وأعجبتني العلامة التجارية التي تبّنونها.

في قطاعكم حالياً، هناك تحول كبير نحو المحتوى البصري. المنافسون يستخدمون الفيديو الاحترافي لجذب العملاء وزيادة المبيعات.

**نحن في Nezar Leads متخصصون في:**
• إنتاج محتوى فيديو احترافي بالذكاء الاصطناعي
• مساعدة علامات سعودية في زيادة تفاعلها بنسبة تصل إلى 300%
• توفير 70% من تكاليف إنتاج المحتوى التقليدي

**هل تفضلون جلسة مجانية مدتها 15 دقيقة** لمناقشة كيف يمكننا مساعدة ${companyName}؟

مع التقدير،

**${COMPANY_INFO.name}**
${COMPANY_INFO.title} | ${COMPANY_INFO.company}

🎯 متخصص في فيديو الذكاء الاصطناعي والتسويق

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 ${COMPANY_INFO.website}
📸 ${COMPANY_INFO.instagram}
🐦 ${COMPANY_INFO.twitter}
🎬 ${COMPANY_INFO.youtube}
`,

  followup: (companyName: string) => `
مرحباً،

ربما صادفت رسالتي السابقة حول محتوى الفيديو الاحترافي.

فقط أردت إضافة نقطة مهمة:

**الفرصة محدودة** - في السوق السعودي حالياً، قليل من العلامات تستخدم الفيديو بفعالية. هذا يعني فرصة ذهبية للتفوق على المنافسين.

هل مهتمين بمعرفة كيف يساعد الفيديو علامتكم؟

بالتوفيق،
**${COMPANY_INFO.name}**

🌐 ${COMPANY_INFO.website}
📸 ${COMPANY_INFO.instagram}
`,

  value: (companyName: string) => `
مرحباً،

لاحظت شيئاً مهماً حول متجركم - منتجاتكم أو خدماتكم تستحق أن تُعرض بشكل أفضل.

هذا ملاحظة سريعة، لا أريد أن آخذ viel من وقتك.

إذا حاببتوا تعرفون أكثر عن كيفية تحسين حضوركم البصري، أنا موجود.

مع التقدير،
**${COMPANY_INFO.name}**
${COMPANY_INFO.company}

🌐 ${COMPANY_INFO.website}
`,

  final: (companyName: string) => `
مرحباً،

هذه آخر رسالة مني بهذا الخصوص.

فهمت أن الوقت الحالي ليس مناسباً، وأقدر ذلك.

**إذا في أي وقت** تحتاجون مساعدة في:
• إنتاج محتوى فيديو بالذكاء الاصطناعي
• إعلانات جذابة لمتجركم
• تطوير حضوركم على السوشيال ميديا

أنا موجود ومساعدتك.

بالتوفيق لكم في عملكم،

**${COMPANY_INFO.name}**
${COMPANY_INFO.title} | ${COMPANY_INFO.company}

🌐 ${COMPANY_INFO.website}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, companyName, emailType = 'initial' } = body;

    if (!to || !companyName) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: to, companyName',
        availableTypes: ['initial', 'followup', 'value', 'final']
      }, { status: 400 });
    }

    // Get email template
    const templateFn = templates[emailType as keyof typeof templates] || templates.initial;
    const emailBody = templateFn(companyName);
    
    // Get A/B test subject line
    const subject = getSubject(emailType, companyName);

    // Get SMTP config
    const configPath = path.join(process.env.HOME || '/root', '.config/imap-smtp-email/.env');
    
    if (!fs.existsSync(configPath)) {
      return NextResponse.json({ success: false, error: 'Email not configured' }, { status: 500 });
    }

    const configContent = fs.readFileSync(configPath, 'utf8');
    const smtpHost = configContent.match(/SMTP_HOST=(.+)/)?.[1]?.trim() || 'smtp.gmail.com';
    const smtpPort = configContent.match(/SMTP_PORT=(.+)/)?.[1]?.trim() || '587';
    const smtpUser = configContent.match(/SMTP_USER=(.+)/)?.[1]?.trim();
    const smtpPass = configContent.match(/SMTP_PASS=(.+)/)?.[1]?.trim();
    const smtpFrom = configContent.match(/SMTP_FROM=(.+)/)?.[1]?.trim();

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ success: false, error: 'SMTP not configured' }, { status: 500 });
    }

    // Send email
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpPort === '465',
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: smtpFrom || smtpUser,
      to: to,
      subject: subject,
      text: emailBody,
    });

    // Log for A/B testing
    console.log(`📧 Email sent: type=${emailType}, to=${to}, subject="${subject}"`);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      details: {
        type: emailType,
        subject: subject,
        to: to,
        company: companyName,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// GET - Return available templates and company info
export async function GET() {
  return NextResponse.json({
    company: COMPANY_INFO,
    templates: Object.keys(templates),
    subjectLines: SUBJECT_LINES,
    usage: {
      POST: {
        to: 'email@example.com',
        companyName: 'اسم الشركة',
        emailType: 'initial | followup | value | final'
      }
    }
  });
}