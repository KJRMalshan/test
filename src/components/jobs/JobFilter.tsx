import React from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';

interface JobFilterProps {
  onFilterChange: (filters: JobFilters) => void;
}

export interface JobFilters {
  type?: string;
  location?: string;
  salary?: {
    min?: number;
    max?: number;
  };
}

const JobFilter: React.FC<JobFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<JobFilters>({});

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Jobs</h2>
      
      <div className="space-y-4">
        <Select
          label="Job Type"
          options={[
            { value: '', label: 'All Types' },
            { value: 'full-time', label: 'Full Time' },
            { value: 'part-time', label: 'Part Time' },
            { value: 'contract', label: 'Contract' },
            { value: 'internship', label: 'Internship' },
          ]}
          onChange={(value) => handleFilterChange('type', value)}
        />

        <Input
          label="Location"
          placeholder="Enter location..."
          onChange={(e) => handleFilterChange('location', e.target.value)}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Salary Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Min"
              onChange={(e) => handleFilterChange('salary', {
                ...filters.salary,
                min: parseInt(e.target.value)
              })}
            />
            <Input
              type="number"
              placeholder="Max"
              onChange={(e) => handleFilterChange('salary', {
                ...filters.salary,
                max: parseInt(e.target.value)
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;