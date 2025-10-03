import React, { useState } from 'react';
import { Job } from '../../types';

const mockJobs: Job[] = [
    { id: '1', title: 'Frontend Developer', company: 'Tech Innovate Rwanda', location: 'Kigali', type: 'Full-time', salary: 'RWF 800,000 - 1,200,000', postedDate: '2 days ago', description: '...' },
    { id: '2', title: 'Marketing Specialist', company: 'Kigali Corp', location: 'Kigali', type: 'Full-time', salary: 'Competitive', postedDate: '5 days ago', description: '...' },
    { id: '3', title: 'Data Entry Clerk', company: 'Admin Solutions Ltd', location: 'Remote', type: 'Part-time', salary: 'RWF 250,000', postedDate: '1 week ago', description: '...' },
];

const JobCard: React.FC<{job: Job}> = ({job}) => (
    <div className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-bold text-brand-blue dark:text-brand-yellow">{job.title}</h3>
        <p className="font-semibold text-gray-800 dark:text-gray-200">{job.company}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{job.location} • {job.type}</p>
        <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-bold text-brand-green">{job.salary}</span>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-brand-blue rounded-lg">Apply Now</button>
        </div>
    </div>
)

export const JobsPage: React.FC = () => {
    return (
         <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Find Your Next Opportunity</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Browse jobs that match your skills and passion.</p>
            </div>
            <div className="space-y-6">
                {mockJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
        </div>
    );
};
