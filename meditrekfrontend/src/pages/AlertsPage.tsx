import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { AlertTriangle, CheckCircle, Clock, X, Eye, Archive } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // from .env

const AlertsPage: React.FC = () => {
  const { user, token } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        
        // Get token from localStorage if not available from context
        const authToken = token || localStorage.getItem('token');
        
        if (!authToken) {
          console.error('No authentication token available');
          setLoading(false);
          return;
        }

        console.log('Fetching alerts from:', `${API_URL}/auth/alerts`);

        const res = await axios.get(`${API_URL}/auth/alerts`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        
        console.log('Alerts API Response:', res.data);
        setAlerts(res.data);
      } catch (error) {
        console.error('Failed to fetch alerts data:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        
        if (error.response?.status === 401) {
          console.error('Authentication failed - token may be expired');
        } else if (error.response?.status === 404) {
          console.error('Alerts endpoint not found - check your backend routes');
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if user is authenticated
    if (user) {
      fetchAlerts();
    }
  }, [user, token]);

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertTriangle,
          iconColor: 'text-red-600'
        };
      case 'warning':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: AlertTriangle,
          iconColor: 'text-yellow-600'
        };
      case 'info':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-600'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          iconColor: 'text-gray-600'
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'unread':
        return { label: 'New', color: 'bg-blue-600 text-white' };
      case 'read':
        return { label: 'Read', color: 'bg-gray-100 text-gray-600' };
      case 'resolved':
        return { label: 'Resolved', color: 'bg-green-100 text-green-600' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-600' };
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const updateAlertStatus = async (id: number, status: string) => {
    try {
      const authToken = token || localStorage.getItem('token');
      
      await axios.put(`${API_URL}/auth/alerts/${id}`, 
        { status },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update local state
      setAlerts(alerts.map(alert => 
        alert.id === id ? { ...alert, status } : alert
      ));
    } catch (error) {
      console.error('Failed to update alert:', error);
    }
  };

  const deleteAlert = async (id: number) => {
    try {
      const authToken = token || localStorage.getItem('token');
      
      await axios.delete(`${API_URL}/auth/alerts/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // Update local state
      setAlerts(alerts.filter(alert => alert.id !== id));
    } catch (error) {
      console.error('Failed to delete alert:', error);
    }
  };

  const markAsRead = (id: number) => {
    updateAlertStatus(id, 'read');
  };

  const markAsResolved = (id: number) => {
    updateAlertStatus(id, 'resolved');
  };

  const archiveAlert = (id: number) => {
    deleteAlert(id);
  };

  const markAllAsRead = async () => {
    const unreadAlerts = alerts.filter(alert => alert.status === 'unread');
    
    try {
      // Update all unread alerts
      for (const alert of unreadAlerts) {
        await updateAlertStatus(alert.id, 'read');
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return alert.status === 'unread';
    if (filter === 'critical') return alert.severity === 'critical';
    return alert.severity === filter;
  });

  const criticalCount = alerts.filter(a => a.severity === 'critical' && a.status !== 'resolved').length;
  const unreadCount = alerts.filter(a => a.status === 'unread').length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Alerts</h1>
            <p className="text-gray-600 mt-2">
              Monitor real-time system alerts and notifications
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {criticalCount} critical • {unreadCount} unread
            </div>
            <button 
              onClick={markAllAsRead}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={unreadCount === 0}
            >
              Mark All Read
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Alerts', count: alerts.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'critical', label: 'Critical', count: criticalCount },
              { key: 'warning', label: 'Warning', count: alerts.filter(a => a.severity === 'warning').length },
              { key: 'info', label: 'Info', count: alerts.filter(a => a.severity === 'info').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        {alerts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical</p>
                  <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {alerts.filter(a => a.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>
        )}

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const severityConfig = getSeverityConfig(alert.severity);
            const statusConfig = getStatusConfig(alert.status);
            const SeverityIcon = severityConfig.icon;

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md ${
                  alert.status === 'unread' ? 'ring-2 ring-blue-100' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      alert.severity === 'critical' ? 'bg-red-100' :
                      alert.severity === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <SeverityIcon className={`w-6 h-6 ${severityConfig.iconColor}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {alert.patient}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${severityConfig.color}`}>
                          {alert.severity}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                      
                      <p className="text-gray-900 font-medium mb-2">{alert.type}</p>
                      <p className="text-gray-600 mb-3">{alert.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{formatTimestamp(alert.timestamp)}</span>
                          <span className="font-medium text-gray-700">{alert.value}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {alert.status === 'unread' && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    
                    {alert.status !== 'resolved' && (
                      <button
                        onClick={() => markAsResolved(alert.id)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Mark as resolved"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => archiveAlert(alert.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="Archive alert"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAlerts.length === 0 && !loading && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-600">
              {alerts.length === 0 
                ? 'No alerts data available.' 
                : filter === 'all' ? 'No alerts to display.' : `No ${filter} alerts at this time.`
              }
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AlertsPage;