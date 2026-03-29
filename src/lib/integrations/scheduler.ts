// Scheduler integration for job scheduling
// This is a placeholder - in production, integrate with Trigger.dev or similar

type JobCallback = () => Promise<void>;

interface ScheduledJob {
  id: string;
  name: string;
  cron: string;
  callback: JobCallback;
  lastRun?: Date;
  nextRun?: Date;
}

class Scheduler {
  private jobs: Map<string, ScheduledJob> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  // Define a scheduled job
  defineJob(config: {
    id: string;
    name: string;
    version: string;
    run: JobCallback;
    trigger: { cron: string };
  }): ScheduledJob {
    const job: ScheduledJob = {
      id: config.id,
      name: config.name,
      cron: config.trigger.cron,
      callback: config.run,
    };
    
    this.jobs.set(config.id, job);
    return job;
  }

  // Start the scheduler
  start(): void {
    console.log('Scheduler started');
    
    // In production, this would use node-cron or similar
    // For now, we'll log that jobs would be scheduled
    
    this.jobs.forEach((job) => {
      console.log(`Registered job: ${job.name} (${job.cron})`);
    });
  }

  // Stop the scheduler
  stop(): void {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();
    console.log('Scheduler stopped');
  }

  // Manually trigger a job
  async triggerJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (job) {
      console.log(`Manually triggering job: ${job.name}`);
      await job.callback();
      job.lastRun = new Date();
    }
  }

  // Get job status
  getJobStatus(jobId: string): ScheduledJob | undefined {
    return this.jobs.get(jobId);
  }

  // List all jobs
  listJobs(): ScheduledJob[] {
    return Array.from(this.jobs.values());
  }
}

// Singleton instance
export const scheduler = new Scheduler();

// Job definitions
export const jobs = {
  morningBrief: scheduler.defineJob({
    id: 'morning-brief',
    name: 'Morning Brief',
    version: '0.1.0',
    run: async () => {
      console.log('Running morning brief job');
      // Will be implemented by Kareem orchestrator
    },
    trigger: { cron: '0 8 * * 1-5' },
  }),

  researchCycle: scheduler.defineJob({
    id: 'research-cycle',
    name: 'Research Cycle',
    version: '0.1.0',
    run: async () => {
      console.log('Running research cycle job');
    },
    trigger: { cron: '15 8 * * 1-5' },
  }),

  enrichment: scheduler.defineJob({
    id: 'enrichment',
    name: 'Lead Enrichment',
    version: '0.1.0',
    run: async () => {
      console.log('Running enrichment job');
    },
    trigger: { cron: '0 11 * * 1-5' },
  }),

  messagingStrategy: scheduler.defineJob({
    id: 'messaging-strategy',
    name: 'Messaging Strategy',
    version: '0.1.0',
    run: async () => {
      console.log('Running messaging strategy job');
    },
    trigger: { cron: '0 12 * * 1-5' },
  }),

  copyDrafting: scheduler.defineJob({
    id: 'copy-drafting',
    name: 'Copy Drafting',
    version: '0.1.0',
    run: async () => {
      console.log('Running copy drafting job');
    },
    trigger: { cron: '0 13 * * 1-5' },
  }),

  qaReview: scheduler.defineJob({
    id: 'qa-review',
    name: 'QA Review',
    version: '0.1.0',
    run: async () => {
      console.log('Running QA review job');
    },
    trigger: { cron: '0 15 * * 1-5' },
  }),

  sendBatch: scheduler.defineJob({
    id: 'send-batch',
    name: 'Send Batch',
    version: '0.1.0',
    run: async () => {
      console.log('Running send batch job');
    },
    trigger: { cron: '30 16 * * 1-5' },
  }),

  pipelineUpdate: scheduler.defineJob({
    id: 'pipeline-update',
    name: 'Pipeline Update',
    version: '0.1.0',
    run: async () => {
      console.log('Running pipeline update job');
    },
    trigger: { cron: '0 17 * * 1-5' },
  }),

  replyCheck: scheduler.defineJob({
    id: 'reply-check',
    name: 'Reply Check',
    version: '0.1.0',
    run: async () => {
      console.log('Running reply check job');
    },
    trigger: { cron: '30 17 * * 1-5' },
  }),

  dashboardRefresh: scheduler.defineJob({
    id: 'dashboard-refresh',
    name: 'Dashboard Refresh',
    version: '0.1.0',
    run: async () => {
      console.log('Running dashboard refresh job');
    },
    trigger: { cron: '0 18 * * 1-5' },
  }),

  eveningReport: scheduler.defineJob({
    id: 'evening-report',
    name: 'Evening Report',
    version: '0.1.0',
    run: async () => {
      console.log('Running evening report job');
    },
    trigger: { cron: '30 19 * * 1-5' },
  }),

  healthCheck: scheduler.defineJob({
    id: 'health-check',
    name: 'Health Check',
    version: '0.1.0',
    run: async () => {
      console.log('Running health check job');
    },
    trigger: { cron: '0 * * * *' },
  }),
};