import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import JobFilter, { JobFilters } from '../components/jobs/JobFilter';
import JobList from '../components/jobs/JobList';
import { Job } from '../types';
import { Search, Filter, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const location = useLocation();

  // Check if we have a success message from job posting
  useEffect(() => {
    if (location.state?.message) {
      setShowSuccessMessage(true);
      // Clear the message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000);
      // Clear the state to prevent showing message on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Fetch jobs from Firebase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsQuery = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(jobsQuery);
        
        const fetchedJobs: Job[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as Job[];

        setJobs(fetchedJobs);
        setFilteredJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to mock data if Firebase fails
        const mockJobs: Job[] = [
          {
            id: '1',
            title: 'Frontend Developer',
            company: 'TechCorp Inc.',
            location: 'Remote',
            type: 'part-time',
            salary: { min: 25, max: 35, currency: '$' },
            description: 'We are looking for a talented Frontend Developer to join our team...',
            requirements: ['React experience', '2+ years JavaScript', 'CSS/HTML proficiency'],
            employerId: 'emp1',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
            status: 'active'
          },
          {
            id: '2',
            title: 'Content Writer',
            company: 'MediaHub',
            location: 'New York, NY',
            type: 'part-time',
            salary: { min: 20, max: 30, currency: '$' },
            description: 'Create engaging content for our digital platforms...',
            requirements: ['Excellent writing skills', 'SEO knowledge', 'Content management experience'],
            employerId: 'emp2',
            createdAt: new Date('2024-01-14'),
            updatedAt: new Date('2024-01-14'),
            status: 'active'
          },
          {
            id: '3',
            title: 'Customer Support Specialist',
            company: 'ServicePro',
            location: 'Los Angeles, CA',
            type: 'part-time',
            salary: { min: 18, max: 22, currency: '$' },
            description: 'Provide excellent customer service and support...',
            requirements: ['Strong communication skills', 'Problem-solving abilities', 'Customer service experience'],
            employerId: 'emp3',
            createdAt: new Date('2024-01-13'),
            updatedAt: new Date('2024-01-13'),
            status: 'active'
          }
        ];
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term and filters
  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Salary filter
    if (filters.salary?.min) {
      filtered = filtered.filter(job => job.salary.max >= filters.salary!.min!);
    }
    if (filters.salary?.max) {
      filtered = filtered.filter(job => job.salary.min <= filters.salary!.max!);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, filters]);

  const handleApply = (jobId: string) => {
    // In a real app, this would handle job application
    console.log('Applying to job:', jobId);
    alert('Application submitted! (This is a demo)');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <p className="text-green-800 font-medium">
              {location.state?.message || 'Job posted successfully!'}
            </p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Part-Time Jobs</h1>
        <p className="text-xl text-gray-600">
          Discover {filteredJobs.length} opportunities that match your preferences
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs, companies, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter size={20} className="mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <JobFilter onFilterChange={setFilters} />
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Sort by: Most Recent</option>
              <option>Sort by: Salary (High to Low)</option>
              <option>Sort by: Salary (Low to High)</option>
              <option>Sort by: Company</option>
            </select>
          </div>

          <JobList jobs={filteredJobs} onApply={handleApply} />

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setFilters({});
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;