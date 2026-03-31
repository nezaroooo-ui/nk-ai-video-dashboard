'use client';

import { Users, Filter, Search, Plus } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';

export default function PipelinePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
            <p className="text-gray-500 mt-1">Track all leads through the outreach funnel</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search leads..." 
                  className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No leads in pipeline yet</p>
            <p className="text-sm text-gray-400 mt-1">Start a research task to add leads</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}