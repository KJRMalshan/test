import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';
import Card from '../ui/Card';
import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react';
import Button from '../ui/Button';

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency}${min}-${currency}${max}/hr`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-green-100 text-green-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'internship':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Link to={`/jobs/${job.id}`} className="block">
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
            </Link>
            <p className="text-gray-600 mt-1 font-medium">{job.company}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
              {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
            </span>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2 text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign size={18} className="mr-2 text-gray-400" />
            <span className="font-semibold text-green-600">
              {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2 text-gray-400" />
            <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 line-clamp-3">
            {job.description.substring(0, 150)}...
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
          <div className="flex flex-wrap gap-2">
            {job.requirements.slice(0, 3).map((req, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md"
              >
                {req}
              </span>
            ))}
            {job.requirements.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                +{job.requirements.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex space-x-3">
          <Link to={`/jobs/${job.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => onApply?.(job.id)}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;