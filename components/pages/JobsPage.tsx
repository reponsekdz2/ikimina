import React, { useState, useMemo } from 'react';
import { Job, UserRole } from '../../types';
import { RippleButton } from '../common/RippleButton';
import { XIcon, CheckCircleIcon, SparklesIcon } from '../IconComponents';
import { GoogleGenAI } from '@google/genai';
import { FileUpload } from '../common/FileUpload';


// Mock Data
const mockJobs: Job[] = [
    { id: '1', title: 'Marketing Manager', company: 'Kigali Corp', location: 'Kigali', type: 'Full-time', salary: 1200000, description: 'Lead our marketing team to create impactful campaigns for our innovative products.', postedDate: '2 days ago', skillMatch: 92 },
    { id: '2', title: 'Frontend Developer', company: 'TechInnovate Rwanda', location: 'Remote', type: 'Contract', salary: 1500000, description: 'Join our agile team to build responsive and user-friendly web applications with modern technologies.', postedDate: '1 week ago', skillMatch: 85 },
    { id: '3', title: 'Agricultural Extension Officer', company: 'AgriSolutions Ltd', location: 'Musanze', type: 'Full-time', salary: 800000, description: 'Work directly with local farmers to implement sustainable agricultural practices and improve crop yields.', postedDate: '5 days ago', skillMatch: 78 },
    { id: '4', title: 'Customer Support Representative', company: 'MTN Rwanda', location: 'Kigali', type: 'Part-time', salary: 400000, description: 'Be the friendly voice of our company, assisting customers with their inquiries and providing top-notch service.', postedDate: '1 day ago', skillMatch: 95 },
    { id: '5', title: 'Data Analyst', company: 'Bank of Kigali', location: 'Kigali', type: 'Full-time', salary: 1300000, description: 'Analyze large datasets to provide actionable insights for business strategy and growth.', postedDate: '3 days ago', skillMatch: 88 },
];

interface PostJobModalProps {
    onClose: () => void;
    onPost: (jobData: Omit<Job, 'id' | 'postedDate' | 'skillMatch'>) => void;
}

const PostJobModal: React.FC<PostJobModalProps> = ({ onClose, onPost }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: 'Kigali Corp', // Assuming pre-filled for the logged-in employer
        location: '',
        type: 'Full-time' as Job['type'],
        salary: 500000,
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            onPost(formData);
            setStep(2);
            setIsSubmitting(false);
        }, 1000);
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] p-4 animate-fade-in-up">
            <div className="w-full max-w-2xl glass-card rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"><XIcon className="w-6 h-6"/></button>
                <h3 className="text-3xl font-bold font-display text-center mb-4">Post a New Job</h3>
                 {step === 1 ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Job Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900/50 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium mb-1">Company</label>
                                <input type="text" name="company" value={formData.company} onChange={handleChange} required disabled className="w-full p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700/50 border-transparent cursor-not-allowed" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900/50 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Job Type</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900/50 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]">
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Salary (RWF per month)</label>
                            <input type="number" name="salary" value={formData.salary} onChange={handleChange} required min="0" step="50000" className="w-full p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900/50 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Job Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900/50 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"></textarea>
                        </div>
                        <RippleButton type="submit" className="w-full text-white bg-gradient-to-r from-brand-primary to-brand-secondary disabled:opacity-75 rounded-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Posting Job...' : 'Post Job'}
                        </RippleButton>
                    </form>
                 ) : (
                    <div className="text-center py-8">
                        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 animate-scale-in" />
                        <h3 className="mt-4 text-2xl font-bold font-display">Job Posted Successfully!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Your job listing is now live for applicants to see.</p>
                        <RippleButton onClick={onClose} className="w-full max-w-xs mx-auto mt-6 text-white bg-brand-primary rounded-full">Close</RippleButton>
                    </div>
                 )}
            </div>
        </div>
    )
}

interface JobApplicationModalProps {
    job: Job;
    onClose: () => void;
    onSubmit: () => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ job, onClose, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [coverLetterKeywords, setCoverLetterKeywords] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [cvFile, setCvFile] = useState<File | null>(null);

    const handleGenerateCoverLetter = async () => {
        setIsGenerating(true);
        setCoverLetter(''); // Clear previous letter
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const keywordsPromptPart = coverLetterKeywords.trim()
                ? `Please make sure to specifically highlight the following skills and keywords: "${coverLetterKeywords}".`
                : '';

            const prompt = `Write a professional and enthusiastic cover letter for a '${job.title}' position at ${job.company}, applying as 'Gisa Chris'. The job description is: "${job.description}". Keep the letter concise, engaging, and under 200 words. ${keywordsPromptPart}`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            setCoverLetter(response.text);
        } catch (error) {
            console.error("Error generating cover letter:", error);
            setCoverLetter("Sorry, an error occurred while generating the cover letter. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(2);
        }, 1000);
    };
    
    const handleCloseAndSubmit = () => {
        onSubmit();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] p-4 animate-fade-in-up">
            <div className="w-full max-w-3xl glass-card rounded-3xl shadow-2xl p-8 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"><XIcon className="w-6 h-6"/></button>
                {step === 1 ? (
                    <div>
                        <h3 className="text-3xl font-bold font-display text-center mb-1">Apply for {job.title}</h3>
                        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-6">at {job.company}</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Cover Letter Section */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Cover Letter</label>
                                <textarea 
                                    value={coverLetter} 
                                    onChange={(e) => setCoverLetter(e.target.value)} 
                                    rows={8} 
                                    placeholder={isGenerating ? "Generating your cover letter..." : "Write your cover letter here, or use the AI generator below."}
                                    className="w-full p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900/50 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                                />
                                <div className="mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-900/50 space-y-2">
                                    <label className="block text-sm font-medium">AI Cover Letter Assistant</label>
                                    <input
                                        type="text"
                                        value={coverLetterKeywords}
                                        onChange={(e) => setCoverLetterKeywords(e.target.value)}
                                        placeholder="Keywords/Skills to Highlight (e.g., leadership, React)"
                                        className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                                    />
                                    <RippleButton type="button" onClick={handleGenerateCoverLetter} disabled={isGenerating} className="w-full text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full disabled:opacity-50">
                                        <span className="flex items-center justify-center space-x-2">
                                            <SparklesIcon className="w-5 h-5"/>
                                            <span>{isGenerating ? 'Generating...' : 'Generate with AI'}</span>
                                        </span>
                                    </RippleButton>
                                </div>
                            </div>
                            
                            {/* CV Upload Section */}
                            <FileUpload label="Upload Your CV/Resume" onFileSelect={setCvFile} acceptedFileTypes=".pdf,.doc,.docx" />

                            <RippleButton type="submit" className="w-full text-white bg-gradient-to-r from-[#32CD32] to-green-500 disabled:opacity-75 rounded-full" disabled={isSubmitting || !cvFile}>
                                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                            </RippleButton>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 animate-scale-in" />
                        <h3 className="mt-4 text-2xl font-bold font-display">Application Sent!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Your application for {job.title} has been successfully submitted.</p>
                        <RippleButton onClick={handleCloseAndSubmit} className="w-full max-w-xs mx-auto mt-6 text-white bg-brand-primary rounded-full">Close</RippleButton>
                    </div>
                )}
            </div>
        </div>
    );
};


interface JobsPageProps {
  userRole: UserRole;
  showNotification: (title: string, message: string) => void;
}

const SkillMatchBar: React.FC<{ percentage: number }> = ({ percentage }) => {
    const getColor = (p: number) => {
        if (p >= 90) return 'from-green-400 to-green-600';
        if (p >= 80) return 'from-yellow-400 to-yellow-600';
        return 'from-orange-400 to-orange-600';
    }
    return (
        <div>
            <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Skill Match</span>
                <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${getColor(percentage)}`}>{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-1">
                <div className={`bg-gradient-to-r ${getColor(percentage)} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

const JobCard: React.FC<{ job: Job, onApply: (job: Job) => void }> = ({ job, onApply }) => (
    <div className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1.5 transition-all duration-300 shadow-lg hover:shadow-xl">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold text-[#1E90FF] dark:text-[#FFD700]">{job.title}</h3>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{job.company} - {job.location}</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 flex-shrink-0">{job.type}</span>
        </div>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-400 line-clamp-2">{job.description}</p>
        <div className="mt-4 space-y-4">
            <SkillMatchBar percentage={job.skillMatch} />
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">Posted {job.postedDate}</span>
                <RippleButton onClick={() => onApply(job)} className="text-sm font-semibold text-white bg-gradient-to-r from-[#1E90FF] to-[#20B2AA] rounded-full">
                    Apply Now
                </RippleButton>
            </div>
        </div>
    </div>
);

export const JobsPage: React.FC<JobsPageProps> = ({ userRole, showNotification }) => {
    const [jobs, setJobs] = useState<Job[]>(mockJobs);
    const [searchTerm, setSearchTerm] = useState('');
    const [jobType, setJobType] = useState('All');
    const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleApplyClick = (job: Job) => {
        setSelectedJob(job);
        setIsApplyModalOpen(true);
    };

    const handleApplicationSubmit = () => {
        showNotification('Application Sent!', `Your application for ${selectedJob?.title} has been successfully submitted.`);
        setIsApplyModalOpen(false);
        setSelectedJob(null);
    };

    const handlePostJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'skillMatch'>) => {
        const newJob: Job = {
            ...newJobData,
            id: (jobs.length + 1).toString(),
            postedDate: 'Just now',
            skillMatch: Math.floor(Math.random() * 21) + 80, // New jobs get a high match score
        };
        setJobs(prevJobs => [newJob, ...prevJobs]);
        showNotification('Job Posted!', `Your new job "${newJob.title}" is now live.`);
    };

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = jobType === 'All' || job.type === jobType;
            return matchesSearch && matchesType;
        });
    }, [searchTerm, jobType, jobs]);
    
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold font-display text-text-primary-light dark:text-text-primary-dark">Find Your Next Opportunity</h1>
                    <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">Browse jobs that match your skills and passion.</p>
                </div>
                {userRole === UserRole.EMPLOYER && (
                    <RippleButton onClick={() => setIsPostJobModalOpen(true)} className="text-white bg-gradient-to-r from-[#32CD32] to-green-500 rounded-full hover:shadow-lg hover:shadow-green-500/50">
                        Post a New Job
                    </RippleButton>
                )}
            </div>

            {/* Filters */}
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search by title or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:flex-grow p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900/50 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                />
                <select 
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full md:w-auto p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900/50 border-transparent focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
                >
                    <option>All</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                </select>
            </div>
            
            {/* Job Listings */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => <JobCard key={job.id} job={job} onApply={handleApplyClick} />)
                ) : (
                    <div className="md:col-span-2 text-center py-12">
                         <p className="text-text-secondary-light dark:text-text-secondary-dark">No jobs found matching your criteria. Try adjusting your search.</p>
                    </div>
                )}
            </div>
            
            {isPostJobModalOpen && <PostJobModal onClose={() => setIsPostJobModalOpen(false)} onPost={handlePostJob} />}
            {isApplyModalOpen && selectedJob && <JobApplicationModal job={selectedJob} onClose={() => setIsApplyModalOpen(false)} onSubmit={handleApplicationSubmit} />}
        </div>
    );
};
