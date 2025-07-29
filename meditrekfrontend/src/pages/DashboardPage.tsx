import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { Activity, AlertTriangle, Users, TrendingUp, Heart, Thermometer } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Active Patients',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-25%',
      changeType: 'positive',
      icon: AlertTriangle
    },
    {
      title: 'Diagnostics Today',
      value: '89',
      change: '+8%',
      changeType: 'positive',
      icon: Activity
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'positive',
      icon: TrendingUp
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      patient: 'John Smith',
      type: 'High Blood Pressure',
      severity: 'high',
      time: '5 minutes ago',
      value: '180/120 mmHg'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      type: 'Low Heart Rate',
      severity: 'medium',
      time: '12 minutes ago',
      value: '45 BPM'
    },
    {
      id: 3,
      patient: 'Michael Brown',
      type: 'Temperature Alert',
      severity: 'low',
      time: '1 hour ago',
      value: '102.1°F'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your patients today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Alerts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Alerts</h2>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {alert.type.includes('Blood') && <Heart className="w-5 h-5 text-red-500" />}
                        {alert.type.includes('Heart') && <Activity className="w-5 h-5 text-blue-500" />}
                        {alert.type.includes('Temperature') && <Thermometer className="w-5 h-5 text-orange-500" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{alert.patient}</h3>
                        <p className="text-sm text-gray-600">{alert.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                        {alert.value}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="font-medium text-blue-900">New Diagnostic</div>
                  <div className="text-sm text-blue-600">Start a new patient assessment</div>
                </button>
                <button className="w-full text-left p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                  <div className="font-medium text-emerald-900">Review Alerts</div>
                  <div className="text-sm text-emerald-600">Check pending notifications</div>
                </button>
                <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="font-medium text-purple-900">Generate Report</div>
                  <div className="text-sm text-purple-600">Create patient summary</div>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data Sync</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monitoring</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Alerts</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600">3 Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;