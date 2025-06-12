import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, Users, TrendingUp, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  const featuredJobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Remote',
      type: 'Part-time',
      salary: '$25-35/hr',
      logo: '💻'
    },
    {
      id: '2',
      title: 'Content Writer',
      company: 'MediaHub',
      location: 'New York, NY',
      type: 'Freelance',
      salary: '$20-30/hr',
      logo: '✍️'
    },
    {
      id: '3',
      title: 'Customer Support',
      company: 'ServicePro',
      location: 'Los Angeles, CA',
      type: 'Part-time',
      salary: '$18-22/hr',
      logo: '🎧'
    }
  ];

  const stats = [
    { icon: Users, label: 'Active Job Seekers', value: '50K+' },
    { icon: TrendingUp, label: 'Jobs Posted', value: '10K+' },
    { icon: Star, label: 'Success Rate', value: '95%' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-yellow-300">Part-Time Job</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover thousands of flexible opportunities that fit your schedule and lifestyle
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-4 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full pl-10 pr-4 py-3 text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-10 pr-4 py-3 text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button variant="primary" size="lg" className="px-8">
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Part-Time Jobs
          </h2>
          <p className="text-xl text-gray-600">
            Hand-picked opportunities from top companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{job.logo}</div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600">{job.salary}</span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/jobs">
            <Button variant="primary" size="lg">
              View All Jobs
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and create a compelling profile that showcases your skills and experience.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse & Apply</h3>
              <p className="text-gray-600">
                Search through thousands of part-time jobs and apply to the ones that match your preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Hired</h3>
              <p className="text-gray-600">
                Connect with employers, ace your interviews, and start your new part-time job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of job seekers who have found their perfect part-time position
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <Button variant="secondary" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;