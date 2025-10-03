import React, { useState, useMemo, useEffect } from 'react';
import { Job, UserRole } from '../../types';
import { RippleButton } from '../common/RippleButton';
import { FileUpload } from '../common/FileUpload';
import { XIcon } from '../IconComponents';

const mockJobs: Job[] = [
    { id: '1', title: 'Frontend Developer', company: 'Tech Innovate Rwanda', location: 'Kigali', type: 'Full-time', salary: 1200000, postedDate: '2 days ago', description: '...', skillMatch: 92 },
    { id: '2', title: 'Marketing Specialist', company: 'Kigali Corp', location: 'Kigali', type: 'Full-time', salary: 950000, postedDate: '5 days ago', description: '...', skillMatch: 78 },
    { id: '3', title: 'Data Entry Clerk', company: 'Admin Solutions Ltd', location: 'Remote', type: 'Part-time', salary: 250000, postedDate: '1 week ago', description: '...', skillMatch: 65 },
    { id: '4', title: 'UI/UX Designer', company: 'Creative Hub', location: 'Kigali', type: 'Contract', salary: 1500000, postedDate: '10 days ago', description: '...', skillMatch: 85 },
];

const CircularProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const color = percentage > 80 ? 'stroke-[#32CD32]' : percentage > 60 ? 'stroke-[#FFD700]' : 'stroke-red-500';

    return (
        <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="w-full h-full transform -rotate-90">
                <circle className="text-gray-200 dark:text-gray-700" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="24" cy="24" />
                <circle className={`transition-all duration-500 ease-out ${color}`} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="24" cy="24" />
            </svg>
            <span className="absolute text-xs font-bold">{percentage}%</span>
        </div>
    );
};

const JobCard: React.FC<{job: Job, onApply: (job: Job) => void}> = ({job, onApply}) => (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#1E90FF] to-[#32CD32]"></div>
        <div className="flex justify-between items-start pt-2">
            <div>
                <h3 className="text-lg font-bold text-[#1E90FF] dark:text-[#FFD700]">{job.title}</h3>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{job.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{job.location} • {job.type}</p>
            </div>
            <div className="text-center">
                 <CircularProgressBar percentage={job.skillMatch} />
                 <span className="text-xs text-gray-500 dark:text-gray-400">Match</span>
            </div>
        </div>
        <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">RWF {job.salary.toLocaleString()}</span>
            <RippleButton onClick={() => onApply(job)} className="text-sm font-semibold text-white bg-gradient-to-r from-[#1E90FF] to-[#20B2AA] hover:shadow-lg hover:shadow-teal-500/50 rounded-full">Apply Now</RippleButton>
        </div>
    </div>
);

const ApplicationProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-1">
            <div className="bg-gradient-to-r from-[#1E90FF] to-[#32CD32] h-2.5 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-xs text-right text-gray-600 dark:text-gray-400">{Math.round(progress)}% Complete</p>
    </div>
);


const JobApplicationModal: React.FC<{ job: Job; onClose: () => void }> = ({ job, onClose }) => {
    const [step, setStep] = useState(1);
    const [uploads, setUploads] = useState<{ cv?: File, diploma?: File, photo?: File }>({});
    const [coverLetter, setCoverLetter] = useState('');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const completedTasks =
            (uploads.cv ? 1 : 0) +
            (uploads.diploma ? 1 : 0) +
            (uploads.photo ? 1 : 0) +
            (coverLetter.trim().length > 20 ? 1 : 0); // Consider cover letter "complete" if > 20 chars
        
        setProgress((completedTasks / 4) * 100);
    }, [uploads, coverLetter]);


    const handleFileSelect = (type: 'cv' | 'diploma' | 'photo', file: File | null) => {
        setUploads(prev => {
            const newUploads = { ...prev };
            if (file) {
                newUploads[type] = file;
            } else {
                delete newUploads[type];
            }
            return newUploads;
        });
    };

    const handleSubmit = () => {
        // In a real app, this would handle form submission via API
        setStep(2);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h4 className="font-bold">Complete Your Application</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Fill all fields to submit.</p>
                            </div>
                            <ApplicationProgressBar progress={progress} />
                        </div>
                        
                        <div className="space-y-4">
                           <FileUpload label="CV (PDF/DOCX)" acceptedFileTypes=".pdf,.doc,.docx" onFileSelect={(file) => handleFileSelect('cv', file)} />
                           <FileUpload label="Diploma/Transcript (PDF)" acceptedFileTypes=".pdf" onFileSelect={(file) => handleFileSelect('diploma', file)} />
                           <FileUpload label="Profile Photo (JPG/PNG)" acceptedFileTypes="image/jpeg,image/png" onFileSelect={(file) => handleFileSelect('photo', file)} />
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cover Letter
                                </label>
                                <textarea 
                                    className="w-full mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 ring-[#1E90FF]" 
                                    rows={4} 
                                    placeholder="Briefly explain why you're a good fit for this role..."
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <RippleButton 
                            onClick={handleSubmit} 
                            className="w-full mt-6 text-white bg-gradient-to-r from-[#1E90FF] to-[#20B2AA] disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-teal-500/50 rounded-full"
                            disabled={progress < 100}
                        >
                            Submit Application
                        </RippleButton>
                    </div>
                );
            case 2:
                return (
                     <div className="text-center py-8">
                        <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-4 text-2xl font-bold font-display">Application Submitted!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Your application for {job.title} at {job.company} has been sent. Good luck!</p>
                        <RippleButton onClick={onClose} className="w-full mt-6 text-white bg-[#1E90FF] rounded-full">Close</RippleButton>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4 animate-fade-in-up">
            <div className="w-full max-w-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"><XIcon className="w-6 h-6"/></button>
                 <h3 className="text-3xl font-bold font-display text-center mb-1">Apply for {job.title}</h3>
                 <p className="text-center text-gray-600 dark:text-gray-400 mb-4 text-sm">at {job.company}</p>
                 {renderStep()}
            </div>
        </div>
    );
};

export const JobsPage: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
    const [filters, setFilters] = useState({ salary: 1500000, types: [] as string[], location: '' });
    const [applyingJob, setApplyingJob] = useState<Job | null>(null);

    const filteredJobs = useMemo(() => {
        return mockJobs.filter(job => {
            const salaryMatch = job.salary <= filters.salary;
            const typeMatch = filters.types.length === 0 || filters.types.includes(job.type);
            const locationMatch = job.location.toLowerCase().includes(filters.location.toLowerCase());
            return salaryMatch && typeMatch && locationMatch;
        });
    }, [filters]);

    const handleTypeChange = (type: string) => {
        setFilters(prev => ({
            ...prev,
            types: prev.types.includes(type) ? prev.types.filter(t => t !== type) : [...prev.types, type]
        }));
    };

    return (
         <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Find Your Next Opportunity</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Browse jobs that match your skills and passion.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className="font-semibold block mb-2">Max Salary: RWF {filters.salary.toLocaleString()}</label>
                        <input type="range" min="100000" max="2000000" step="50000" value={filters.salary} onChange={e => setFilters({...filters, salary: parseInt(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
                    </div>
                    <div>
                        <label className="font-semibold block mb-2">Job Type</label>
                        <div className="flex space-x-4">
                            {['Full-time', 'Part-time', 'Contract'].map(type => (
                                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" checked={filters.types.includes(type)} onChange={() => handleTypeChange(type)} className="form-checkbox rounded text-[#1E90FF] focus:ring-transparent" />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold block mb-1">Location</label>
                        <input type="text" placeholder="e.g. Kigali" value={filters.location} onChange={e => setFilters({...filters, location: e.target.value})} className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"/>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {filteredJobs.map(job => <JobCard key={job.id} job={job} onApply={setApplyingJob} />)}
            </div>
            
            {applyingJob && <JobApplicationModal job={applyingJob} onClose={() => setApplyingJob(null)} />}
        </div>
    );
};