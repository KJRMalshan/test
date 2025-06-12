import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { ArrowLeft, Plus, X } from 'lucide-react';

const PostJob: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'part-time',
    salaryMin: '',
    salaryMax: '',
    currency: '$',
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: ['']
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'requirements' | 'responsibilities' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'requirements' | 'responsibilities' | 'benefits', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!user) {
      setError('You must be logged in to post a job');
      setIsLoading(false);
      return;
    }

    // Validation
    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (!formData.salaryMin || !formData.salaryMax) {
      setError('Please provide salary range');
      setIsLoading(false);
      return;
    }

    if (parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)) {
      setError('Maximum salary must be greater than minimum salary');
      setIsLoading(false);
      return;
    }

    // Filter out empty requirements, responsibilities, and benefits
    const cleanRequirements = formData.requirements.filter(req => req.trim() !== '');
    const cleanResponsibilities = formData.responsibilities.filter(resp => resp.trim() !== '');
    const cleanBenefits = formData.benefits.filter(benefit => benefit.trim() !== '');

    if (cleanRequirements.length === 0) {
      setError('Please add at least one requirement');
      setIsLoading(false);
      return;
    }

    try {
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        salary: {
          min: parseInt(formData.salaryMin),
          max: parseInt(formData.salaryMax),
          currency: formData.currency
        },
        description: formData.description,
        requirements: cleanRequirements,
        responsibilities: cleanResponsibilities,
        benefits: cleanBenefits,
        employerId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active'
      };

      await addDoc(collection(db, 'jobs'), jobData);
      
      // Success - redirect to jobs page
      navigate('/jobs', { 
        state: { message: 'Job posted successfully!' }
      });
    } catch (err) {
      console.error('Error posting job:', err);
      setError('Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-xl text-gray-600">
            Find the perfect candidate for your part-time position
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Job Title *"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    required
                  />
                  
                  <Input
                    label="Company Name *"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="e.g. TechCorp Inc."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Location *"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g. Remote, New York, NY"
                    required
                  />
                  
                  <Select
                    label="Job Type *"
                    options={[
                      { value: 'part-time', label: 'Part Time' },
                      { value: 'full-time', label: 'Full Time' },
                      { value: 'contract', label: 'Contract' },
                      { value: 'internship', label: 'Internship' }
                    ]}
                    value={formData.type}
                    onChange={(value) => handleInputChange('type', value)}
                  />
                </div>
              </div>

              {/* Salary Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Salary Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Select
                    label="Currency"
                    options={[
                      { value: '$', label: 'USD ($)' },
                      { value: '€', label: 'EUR (€)' },
                      { value: '£', label: 'GBP (£)' }
                    ]}
                    value={formData.currency}
                    onChange={(value) => handleInputChange('currency', value)}
                  />
                  
                  <Input
                    label="Minimum Salary (per hour) *"
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                    placeholder="25"
                    required
                  />
                  
                  <Input
                    label="Maximum Salary (per hour) *"
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                    placeholder="35"
                    required
                  />
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Job Description
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                    required
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Requirements
                </h2>
                
                <div className="space-y-3">
                  {formData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Input
                        value={requirement}
                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                        placeholder="e.g. 2+ years of React experience"
                        className="flex-1"
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('requirements', index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('requirements')}
                    className="mt-2"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Requirement
                  </Button>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Responsibilities (Optional)
                </h2>
                
                <div className="space-y-3">
                  {formData.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Input
                        value={responsibility}
                        onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                        placeholder="e.g. Develop user-facing web applications"
                        className="flex-1"
                      />
                      {formData.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('responsibilities', index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('responsibilities')}
                    className="mt-2"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Responsibility
                  </Button>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Benefits (Optional)
                </h2>
                
                <div className="space-y-3">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Input
                        value={benefit}
                        onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                        placeholder="e.g. Flexible working hours"
                        className="flex-1"
                      />
                      {formData.benefits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('benefits', index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('benefits')}
                    className="mt-2"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Benefit
                  </Button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="sm:w-auto"
                >
                  {isLoading ? 'Posting Job...' : 'Post Job'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostJob;