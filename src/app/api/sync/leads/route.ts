import { NextResponse } from 'next/server';
import { syncNewLeadsToSheets } from '@/lib/integrations/leads-sync';

export async function POST() {
  try {
    const result = await syncNewLeadsToSheets();
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Use POST to sync leads to Google Sheets',
    endpoint: '/api/sync/leads'
  });
}
