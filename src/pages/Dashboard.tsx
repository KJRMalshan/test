import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { User, Briefcase, FileText, Settings, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const stats = [
    { label: 'Applications Sent', value: '12', icon: FileText },
    { label: 'Profile Views', value: '45', icon: User },
    { label: 'Saved Jobs', value: '8', icon: Briefcase },
  ];

  const recentApplications = [
    {
      id: '1',
      jobTitle: 'Frontend Developer',
      company: 'TechCorp Inc.',
      status: 'Under Review',
      appliedDate: '2024-01-15'
    },
    {
      id: '2',
      jobTitle: 'Content Writer',
      company: 'MediaHub',
      status: 'Interview Scheduled',
      appliedDate: '2024-01-14'
    },
    {
      id: '3',
      jobTitle: 'Customer Support',
      company: 'ServicePro',
      status: 'Rejected',
      appliedDate: '2024-01-13'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.displayName || user?.email}!
            </h1>
            <p className="text-xl text-gray-600">
              Here's what's happening with your job search
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{application.jobTitle}</h3>
                    <p className="text-sm text-gray-600">{application.company}</p>
                    <p className="text-xs text-gray-500">Applied on {application.appliedDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    application.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                    application.status === 'Interview Scheduled' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Applications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="primary" className="w-full justify-start">
                <Briefcase size={20} className="mr-3" />
                Browse New Jobs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User size={20} className="mr-3" />
                Update Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText size={20} className="mr-3" />
                Upload Resume
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings size={20} className="mr-3" />
                Account Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Completion */}
      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Complete Your Profile</h2>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Profile Completion</span>
              <span>75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Complete your profile to increase your chances of getting hired by 3x
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-600">Basic information added</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-600">Email verified</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              <span className="text-gray-600">Add work experience</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
              <span className="text-gray-600">Upload resume</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;