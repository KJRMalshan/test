export interface User {
  id: string;
  email: string;
  role: 'jobseeker' | 'employer' | 'admin';
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  responsibilities?: string[];
  benefits?: string[];
  employerId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'closed' | 'draft';
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  coverLetter: string;
  resumeUrl: string;
  createdAt: Date;
  updatedAt: Date;
}