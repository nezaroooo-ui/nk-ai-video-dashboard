// Database client for Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types based on our schemas
export interface MasterLead {
  id: string;
  company_name: string;
  website: string;
  industry: string;
  country: string;
  contact_name: string | null;
  role: string | null;
  email: string | null;
  linkedin: string | null;
  instagram: string | null;
  source: string;
  segment: string;
  initial_notes: string | null;
  research_date: string;
  initial_tier: 'A' | 'B' | 'C';
  owner_agent: string;
  created_at: string;
  updated_at: string;
}

export interface LeadInsight {
  id: string;
  lead_id: string;
  pain_point: string;
  opportunity_angle: string;
  recommended_offer: string;
  personalization_hook: string;
  relevance_score: number;
  priority_reason: string;
  current_content_weakness: string | null;
  competitor_observation: string | null;
  insight_date: string;
  enriched_by: string;
  created_at: string;
}

export interface PipelineRecord {
  id: string;
  lead_id: string;
  current_status: PipelineStatus;
  channel: 'email' | 'linkedin' | null;
  last_contact_date: string | null;
  template_used: string | null;
  subject_line: string | null;
  follow_up_count: number;
  last_response_type: ResponseType | null;
  next_action: string;
  next_action_date: string | null;
  assigned_agent: string;
  notes: string | null;
  updated_at: string;
  updated_by: string;
}

export type PipelineStatus = 
  | 'new' 
  | 'researched' 
  | 'enriched' 
  | 'ready_for_messaging' 
  | 'ready_for_qa' 
  | 'approved' 
  | 'sent' 
  | 'opened' 
  | 'replied' 
  | 'interested' 
  | 'follow_up_needed' 
  | 'meeting_requested' 
  | 'proposal_sent' 
  | 'won' 
  | 'lost' 
  | 'do_not_contact';

export type ResponseType = 
  | 'interested' 
  | 'need_details' 
  | 'ask_for_pricing' 
  | 'send_samples' 
  | 'not_now' 
  | 'not_relevant' 
  | 'no_response_needed';

export interface MessageTemplate {
  id: string;
  segment: string;
  offer_type: string;
  variant_name: string;
  channel: 'email' | 'linkedin';
  subject_line: string | null;
  opening_line: string;
  main_body: string;
  cta: string;
  status: 'active' | 'testing' | 'retired';
  performance_notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface DailyReport {
  id: string;
  report_date: string;
  leads_added: number;
  leads_enriched: number;
  messages_approved: number;
  messages_sent: number;
  opens: number;
  replies: number;
  positive_replies: number;
  meetings: number;
  best_segment: string;
  best_segment_reply_rate: number;
  best_template: string;
  best_template_reply_rate: number;
  notes: string | null;
  created_at: string;
}

export interface AgentActivity {
  id: string;
  agent_name: string;
  action_type: string;
  target_type: string;
  target_id: string | null;
  description: string;
  status: 'success' | 'failed' | 'partial';
  error_message: string | null;
  duration_ms: number | null;
  timestamp: string;
}

export interface FounderRequest {
  id: string;
  type: 'infrastructure' | 'approval' | 'decision' | 'access' | 'subscription' | 'meeting' | 'other';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  required_action: string;
  created_by: string;
  due_date: string | null;
  status: 'open' | 'in_progress' | 'resolved' | 'rejected';
  resolution: string | null;
  resolved_by: string | null;
  resolved_at: string | null;
  created_at: string;
}

export interface NotificationLog {
  id: string;
  type: 'morning_brief' | 'evening_report' | 'hot_lead' | 'meeting_request' | 'pricing_request' | 'technical_issue' | 'founder_request' | 'strategy_note';
  channel: string;
  topic: string | null;
  title: string;
  content_summary: string;
  full_content: string;
  target: string | null;
  status: 'queued' | 'sent' | 'failed' | 'retried' | 'acknowledged';
  error_message: string | null;
  sent_at: string;
  acknowledged_at: string | null;
}

export interface TechnicalHealth {
  id: string;
  check_type: 'health' | 'incident' | 'recovery' | 'alert';
  component: 'google_sheets' | 'gmail_api' | 'telegram_bot' | 'database' | 'scheduler' | 'dashboard' | 'api';
  status: 'healthy' | 'warning' | 'error' | 'critical';
  details: string;
  metrics: Record<string, unknown> | null;
  response_time_ms: number | null;
  resolution: string | null;
  resolved_at: string | null;
  created_at: string;
}