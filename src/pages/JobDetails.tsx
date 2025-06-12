import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Building, Calendar, ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const JobDetails: React.FC = () => {
  const { id } = useParams();

  // Mock job data - in a real app, this would be fetched based on the ID
  const job = {
    id: id || '1',
    title: 'Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'Remote',
    type: 'part-time',
    salary: { min: 25, max: 35, currency: '$' },
    description: `We are looking for a talented Frontend Developer to join our dynamic team. You will be responsible for creating engaging user interfaces and ensuring excellent user experiences across our web applications.

This is a part-time position perfect for someone looking to balance work with other commitments. You'll work with modern technologies and collaborate with a passionate team of developers and designers.`,
    requirements: [
      'Strong proficiency in React and JavaScript',
      '2+ years of frontend development experience',
      'Experience with CSS frameworks (Tailwind CSS preferred)',
      'Knowledge of version control systems (Git)',
      'Understanding of responsive design principles',
      'Excellent problem-solving skills',
      'Strong communication and teamwork abilities'
    ],
    responsibilities: [
      'Develop and maintain user-facing web applications',
      'Collaborate with designers to implement UI/UX designs',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and team meetings',
      'Optimize applications for maximum speed and scalability',
      'Stay up-to-date with emerging technologies and best practices'
    ],
    benefits: [
      'Flexible working hours',
      'Remote work opportunity',
      'Competitive hourly rate',
      'Professional development opportunities',
      'Collaborative team environment',
      'Modern tech stack'
    ],
    employerId: 'emp1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    status: 'active' as const,
    companyInfo: {
      size: '50-100 employees',
      industry: 'Technology',
      founded: '2018',
      website: 'https://techcorp.com'
    }
  };

  const handleApply = () => {
    const applyWindow = window.open('/apply', '_blank', 'width=500,height=600');
    if (!applyWindow) {
    alert('Popup blocked! Please allow popups for this site.');
  }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-700">
          <ArrowLeft size={20} className="mr-2" />
          Back to Jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-gray-600">{job.company}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {job.type}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign size={18} className="mr-2" />
                  <span>{job.salary.currency}{job.salary.min}-{job.salary.max}/hour</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2" />
                  <span>Posted {job.createdAt.toLocaleDateString()}</span>
                </div>
              </div>

              <Button variant="primary" size="lg" onClick={handleApply} className="w-full md:w-auto">
                Apply Now
              </Button>
            </div>
          </Card>

          {/* Job Description */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none">
                {job.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Card>

          {/* Requirements */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Responsibilities */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Benefits */}
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this job</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {job.salary.currency}{job.salary.min}-{job.salary.max}
                  </div>
                  <div className="text-sm text-gray-600">per hour</div>
                </div>
                <Button variant="primary" className="w-full" onClick={handleApply}>
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  Save Job
                </Button>
              </div>
            </div>
          </Card>

          {/* Company Info */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Building size={16} className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">{job.companyInfo.industry}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">Founded in {job.companyInfo.founded}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600">{job.companyInfo.size}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Company Profile
              </Button>
            </div>
          </Card>

          {/* Similar Jobs */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {[
                  { title: 'React Developer', company: 'StartupCo', salary: '$30-40/hr' },
                  { title: 'UI/UX Designer', company: 'DesignHub', salary: '$25-35/hr' },
                  { title: 'Full Stack Developer', company: 'WebCorp', salary: '$35-45/hr' }
                ].map((similarJob, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <h4 className="font-medium text-gray-900">{similarJob.title}</h4>
                    <p className="text-sm text-gray-600">{similarJob.company}</p>
                    <p className="text-sm font-medium text-blue-600">{similarJob.salary}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;