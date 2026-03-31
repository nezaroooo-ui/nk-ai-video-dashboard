'use client';

import { Settings, User, Bell, Shield, Link2, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Configure your outbound system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Navigation */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <nav className="space-y-1">
              <a href="#profile" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg">
                <User className="w-4 h-4" /> Profile
              </a>
              <a href="#notifications" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                <Bell className="w-4 h-4" /> Notifications
              </a>
              <a href="#integrations" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                <Link2 className="w-4 h-4" /> Integrations
              </a>
              <a href="#security" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
                <Shield className="w-4 h-4" /> Security
              </a>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-4 h-4" /> Founder Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" defaultValue="Nezar Kamel" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" defaultValue="nezar@nezarkamel.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input type="url" defaultValue="https://nezarkamel.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <input type="text" defaultValue="AI Video Production" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Integration Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Link2 className="w-4 h-4" /> Integrations
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="font-medium">Google Sheets</span>
                  </div>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="font-medium">Gmail</span>
                  </div>
                  <span className="text-sm text-gray-500">Not configured</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="font-medium">Telegram Bot</span>
                  </div>
                  <span className="text-sm text-gray-500">Not configured</span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}