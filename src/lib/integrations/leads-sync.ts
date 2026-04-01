import { sheetsService } from './google-sheets-service';
import fs from 'fs';
import path from 'path';

const DASHBOARD_DATA_DIR = '/data/.openclaw/workspace/dashboard-data';

interface Lead {
  companyName: string;
  website: string;
  email: string;
  segment: string;
  country: string;
  tier: string;
  notes: string;
}

interface NewLeadsFile {
  date: string;
  leads: Lead[];
}

/**
 * Sync new leads from JSON files to Google Sheets
 */
export async function syncNewLeadsToSheets(): Promise<{ synced: number; errors: string[] }> {
  const errors: string[] = [];
  let synced = 0;

  try {
    // Find all new-leads files
    const files = fs.readdirSync(DASHBOARD_DATA_DIR)
      .filter(f => f.startsWith('new-leads-') && f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(DASHBOARD_DATA_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const data: NewLeadsFile = JSON.parse(content);

      for (const lead of data.leads) {
        try {
          // Check if lead already exists (by website)
          const existingLeads = await sheetsService.getLeads();
          const exists = existingLeads.some((l: any) => 
            l.website && l.website.toLowerCase() === lead.website.toLowerCase()
          );

          if (!exists) {
            // Match the exact column order in Master Leads sheet
            const newRow = [
              generateUUID(),           // A: Lead ID
              lead.companyName,         // B: Company Name
              lead.website,             // C: Website
              lead.segment,             // D: Industry
              lead.country,             // E: Country
              '',                       // F: Contact Name
              '',                       // G: Role
              lead.email || '',         // H: Email
              '',                       // I: LinkedIn
              '',                       // J: Instagram
              'Research',               // K: Source
              lead.segment,             // L: Segment
              lead.notes,               // M: Initial Notes
              new Date().toISOString(), // N: Research Date
              lead.tier,                // O: Initial Tier
              'mazen'                   // P: Owner Agent
            ];

            await sheetsService.appendRow('Master Leads', newRow);
            synced++;
          }
        } catch (err: any) {
          errors.push(`Error syncing ${lead.companyName}: ${err.message}`);
        }
      }

      // Mark file as synced (rename)
      const syncedFileName = file.replace('.json', '-synced.json');
      fs.renameSync(filePath, path.join(DASHBOARD_DATA_DIR, syncedFileName));
    }

    return { synced, errors };
  } catch (err: any) {
    errors.push(`Sync error: ${err.message}`);
    return { synced, errors };
  }
}

/**
 * Get leads from local JSON files (not yet synced)
 */
export function getPendingLeads(): NewLeadsFile[] {
  const files = fs.readdirSync(DASHBOARD_DATA_DIR)
    .filter(f => f.startsWith('new-leads-') && f.endsWith('.json'))
    .map(f => {
      const content = fs.readFileSync(path.join(DASHBOARD_DATA_DIR, f), 'utf-8');
      return JSON.parse(content);
    });
  return files;
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
