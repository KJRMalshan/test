import React from 'react';
import { Job } from '../../types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
  onApply?: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onApply }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
        <p className="mt-2 text-gray-600">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onApply={onApply}
        />
      ))}
    </div>
  );
};

export default JobList;