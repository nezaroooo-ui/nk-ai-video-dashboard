import { NextResponse } from 'next/server';
import { sheetsService } from '@/lib/integrations/google-sheets-service';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const stats = await sheetsService.getDailyStats();
    const leads = await sheetsService.getLeads();
    const pipeline = await sheetsService.getPipeline();

    // Check email connection
    let emailConnected = false;
    try {
      const emailConfigPath = path.join(process.env.HOME || '/root', '.config/imap-smtp-email/.env');
      emailConnected = fs.existsSync(emailConfigPath);
    } catch (e) {
      emailConnected = false;
    }

    return NextResponse.json({
      stats,
      leads: leads.slice(0, 10),
      pipeline: pipeline.slice(0, 10),
      connected: true,
      emailConnected
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({
      error: error.message || 'Failed to fetch data',
      connected: false,
      stats: {
        totalLeads: 0,
        newLeadsToday: 0,
        pipeline: {
          total: 0,
          sent: 0,
          replied: 0,
          interested: 0,
        }
      },
      leads: [],
      pipeline: []
    }, { status: 200 });
  }
}