import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agent, action } = body;

    // This would normally trigger actual agent actions
    // For now, return a success response indicating the action was registered
    return NextResponse.json({
      success: true,
      agent,
      action,
      message: `Agent ${agent} ${action} triggered`,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}