import { NextResponse } from 'next/server';
import { sheetsService } from '@/lib/integrations/google-sheets-service';

export async function GET() {
  try {
    const stats = await sheetsService.getDailyStats();
    const leads = await sheetsService.getLeads();
    const pipeline = await sheetsService.getPipeline();

    return NextResponse.json({
      stats,
      leads: leads.slice(0, 10), // Top 10 recent leads
      pipeline: pipeline.slice(0, 10), // Top 10 pipeline records
      connected: true
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message || 'Failed to fetch data',
      connected: false
    }, { status: 500 });
  }
}