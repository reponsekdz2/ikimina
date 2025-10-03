import React, { useState } from 'react';
import { Job, UserRole } from '../../types';
import { BriefcaseIcon, BookmarkIcon, XIcon, PlusCircleIcon } from '../IconComponents';

const mockJobs: Job[] = [
    { id: 1, title: 'Frontend Developer', company: 'MTN Rwanda', salary: 'RWF 1.5M - 2M', deadline: 'Oct 30', bookmarked: false },
    { id: 2, title: 'UX/UI Designer', company: 'Bank of Kigali', salary: 'RWF 1.2M - 1.8M', deadline: 'Nov 5', bookmarked: true },
    { id: 3, title: 'Marketing Manager', company: 'Inyange Industries', salary: 'RWF 2M - 2.5M', deadline: 'Nov 10', bookmarked: false },
    { id: 4, title: 'Data Analyst', company: 'Irembo', salary: 'RWF 1.8M - 2.2M', deadline: 'Oct 28', bookmarked: false },
];

const JobCard: React.FC<{job: Job, onBookmark: (id: number) => void, onApply: () => void}> = ({ job, onBookmark, onApply }) => (
    <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{job.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
            </div>
            <button onClick={() => onBookmark(job.id)} className="p-2 text-gray-400 hover:text-brand-yellow">
                <BookmarkIcon isFilled={job.bookmarked} className={`w-6 h-6 ${job.bookmarked ? 'text-brand-yellow' : ''}`} />
            </button>
        </div>
        <div className="my-4">
            <p className="font-semibold text-brand-green dark:text-green-400">{job.salary}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Deadline: {job.deadline}</p>
        </div>
        <button onClick={onApply} className="mt-auto w-full py-2 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg hover:opacity-90 transition-opacity">Apply Now</button>
    </div>
);

const ApplyModal: React.FC<{onClose: () => void}> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
        <div className="w-full max-w-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"><XIcon className="w-6 h-6"/></button>
            <h2 className="text-2xl font-bold font-display text-center">Apply for Job</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-2">Submit your CV and a cover letter.</p>
            <div className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload CV</label>
                    <input type="file" className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"/>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Letter</label>
                    <textarea rows={4} className="mt-1 w-full p-2 bg-white/80 dark:bg-gray-700/80 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="Why are you a good fit?"></textarea>
                </div>
                <button className="w-full py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Submit Application</button>
            </div>
        </div>
    </div>
);

// FIX: Destructured userRole from props to make it available in the component.
export const JobsPage: React.FC<{userRole: UserRole}> = ({ userRole }) => {
    const [jobs, setJobs] = useState(mockJobs);
    const [isApplyModalOpen, setApplyModalOpen] = useState(false);

    const handleBookmark = (id: number) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, bookmarked: !job.bookmarked } : job));
    };

    return (
        <div className="space-y-8">
            {isApplyModalOpen && <ApplyModal onClose={() => setApplyModalOpen(false)} />}

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Job Market</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Find your next opportunity or top talent.</p>
                </div>
                {userRole === UserRole.EMPLOYER && (
                     <button className="px-5 py-2.5 font-medium text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg hover:shadow-lg flex items-center space-x-2">
                        <PlusCircleIcon className="w-5 h-5"/>
                        <span>Post a Job</span>
                    </button>
                )}
            </div>
            
            {/* Filters */}
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4">
                <input type="text" placeholder="Search by title or company..." className="flex-grow w-full md:w-auto px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"/>
                <select className="w-full md:w-auto px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue">
                    <option>All Categories</option>
                    <option>Tech</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                </select>
                <button className="px-6 py-2 font-semibold text-white bg-brand-blue rounded-lg">Search</button>
            </div>
            
            {/* Job Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => <JobCard key={job.id} job={job} onBookmark={handleBookmark} onApply={() => setApplyModalOpen(true)} />)}
            </div>
        </div>
    );
};