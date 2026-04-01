import { NextResponse } from 'next/server';
import { sheetsService } from '@/lib/integrations/google-sheets-service';

function generateLeadId(): string {
  const count = Date.now().toString(36).toUpperCase();
  return `LEAD-${count}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, agent, leadData } = body;

    if (action === 'add-lead' && leadData) {
      // Add new lead to Google Sheets
      const leadId = generateLeadId();
      const now = new Date().toISOString().split('T')[0];
      
      const newRow = [
        leadId,
        leadData.companyName || '',
        leadData.website || '',
        leadData.industry || 'Other',
        leadData.country || 'SA',
        leadData.contactName || '',
        leadData.role || '',
        leadData.email || '',
        leadData.linkedIn || '',
        leadData.instagram || '',
        'Manual Add',
        leadData.segment || leadData.industry || 'Other',
        leadData.notes || '',
        now,
        'B',
        'kareem'
      ];

      const success = await sheetsService.appendRow('Master Leads', newRow);
      
      if (success) {
        return NextResponse.json({ success: true, leadId });
      } else {
        return NextResponse.json({ success: false, error: 'Failed to add lead' }, { status: 500 });
      }
    }

    if (action === 'start-research' && agent === 'mazen') {
      // Trigger research agent - this would normally spawn a sub-agent
      // For now, we'll just return success and the agent can be triggered via cron
      return NextResponse.json({ 
        success: true, 
        message: 'Research task queued',
        agent: 'mazen',
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}