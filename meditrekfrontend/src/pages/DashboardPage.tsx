import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api'; // axios instance with auth token

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/dashboard');
        const data = res.data;

        setStats([
          {
            title: 'Active Patients',
            value: data.stats.activePatients,
            change: '+12%',
            changeType: 'positive',
            icon: Users
          },
          {
            title: 'Critical Alerts',
            value: data.stats.criticalAlerts,
            change: '-25%',
            changeType: 'positive',
            icon: AlertTriangle
          },
          {
            title: 'Diagnostics Today',
            value: data.stats.diagnosticsToday,
            change: '+8%',
            changeType: 'positive',
            icon: Activity
          },
          {
            title: 'System Uptime',
            value: data.stats.systemUptime,
            change: '+0.1%',
            changeType: 'positive',
            icon: TrendingUp
          }
        ]);

        setAlerts(data.recentAlerts);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 shadow-md rounded-2xl">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </p>
              </div>
              <stat.icon className="w-6 h-6 text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 border rounded-xl flex items-start gap-4 bg-white shadow-sm"
            >
              <AlertTriangle className="text-red-500 mt-1" />
              <div>
                <p className="font-semibold">{alert.patient}</p>
                <p className="text-sm text-gray-600">{alert.type}</p>
                <p className="text-sm">{alert.value}</p>
                <p className="text-xs text-gray-400">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
