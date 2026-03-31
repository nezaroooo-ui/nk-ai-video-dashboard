'use client';

import { FileText, Download, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500 mt-1">Daily and weekly performance reports</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Recent Reports</h2>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Daily Report - Today</p>
                  <p className="text-sm text-gray-500">Generated automatically</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700">View</button>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Weekly Summary</p>
                  <p className="text-sm text-gray-500">Last week</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700">View</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No reports generated yet</p>
          <p className="text-sm text-gray-400 mt-1">Reports are generated automatically after running tasks</p>
        </div>
      </div>
    </DashboardLayout>
  );
}