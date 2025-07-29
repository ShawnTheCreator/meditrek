import React, { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { Search, Filter, Calendar, Download, Plus, Activity } from 'lucide-react';

const DiagnosticsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const diagnostics = [
    {
      id: 1,
      patient: 'John Smith',
      type: 'Blood Analysis',
      status: 'completed',
      date: '2025-01-15',
      time: '10:30 AM',
      priority: 'high',
      results: 'Elevated cholesterol levels detected'
    },
    {
      id: 2,
      patient: 'Sarah Johnson',
      type: 'ECG Monitoring',
      status: 'in-progress',
      date: '2025-01-15',
      time: '11:15 AM',
      priority: 'medium',
      results: 'Monitoring ongoing...'
    },
    {
      id: 3,
      patient: 'Michael Brown',
      type: 'X-Ray Chest',
      status: 'completed',
      date: '2025-01-14',
      time: '2:45 PM',
      priority: 'low',
      results: 'No abnormalities detected'
    },
    {
      id: 4,
      patient: 'Emily Davis',
      type: 'MRI Brain',
      status: 'pending',
      date: '2025-01-16',
      time: '9:00 AM',
      priority: 'high',
      results: 'Scheduled for tomorrow'
    },
    {
      id: 5,
      patient: 'David Wilson',
      type: 'Blood Pressure',
      status: 'completed',
      date: '2025-01-14',
      time: '4:20 PM',
      priority: 'medium',
      results: 'Within normal range'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredDiagnostics = diagnostics.filter(diagnostic => {
    const matchesSearch = diagnostic.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diagnostic.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || diagnostic.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Diagnostics</h1>
            <p className="text-gray-600 mt-2">Monitor and manage all diagnostic tests</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Diagnostic</span>
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search diagnostics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Date Range</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostics Grid */}
        <div className="grid gap-6">
          {filteredDiagnostics.map((diagnostic) => (
            <div key={diagnostic.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{diagnostic.patient}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(diagnostic.status)}`}>
                        {diagnostic.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{diagnostic.type}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>{diagnostic.date} at {diagnostic.time}</span>
                      <span className={`font-medium ${getPriorityColor(diagnostic.priority)}`}>
                        {diagnostic.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Results: </span>
                  {diagnostic.results}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredDiagnostics.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No diagnostics found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DiagnosticsPage;