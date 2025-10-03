import React, { useState } from 'react';
import { SearchIcon, BriefcaseIcon, BookmarkIcon, ShareIcon, SpeakerIcon } from '../IconComponents';

const JobCard: React.FC<{title: string; company: string; location: string; type: string; salary: string, skillMatch: number}> = ({ title, company, location, type, salary, skillMatch }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    return (
        <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue dark:text-brand-yellow">{company}</p>
                    <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mt-1">{title}</h3>
                </div>
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center font-bold text-brand-blue">
                    {company.charAt(0)}
                </div>
            </div>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{location}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                <span>{type}</span>
            </div>
            <p className="mt-2 font-semibold text-gray-700 dark:text-gray-200">{salary}</p>
            <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-bold text-green-600">Skill Match: {skillMatch}%</p>
                <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-brand-blue">
                    <SpeakerIcon className="w-4 h-4" />
                    <span>Read</span>
                </button>
            </div>
            <div className="mt-auto pt-4 flex items-center justify-between">
                 <button className="w-full mr-2 py-2.5 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg hover:opacity-90 transition-opacity">
                    View Details
                </button>
                <div className="flex space-x-2">
                    <button onClick={() => setIsBookmarked(!isBookmarked)} className="p-2 text-gray-500 hover:text-brand-yellow rounded-full">
                        <BookmarkIcon isFilled={isBookmarked} />
                    </button>
                     <button className="p-2 text-gray-500 hover:text-brand-blue rounded-full">
                        <ShareIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

const FilterInput: React.FC<{label: string; children: React.ReactNode}> = ({label, children}) => (
    <div>
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</label>
        {children}
    </div>
);

export const JobsPage: React.FC = () => {
    const jobs = [
        { title: 'Senior Frontend Engineer', company: 'MTN Rwanda', location: 'Kigali', type: 'Full-time', salary: 'RWF 2.5M - 3.5M', skillMatch: 92 },
        { title: 'Product Manager', company: 'Bank of Kigali', location: 'Kigali', type: 'Full-time', salary: 'RWF 2.8M - 4M', skillMatch: 85 },
        { title: 'DevOps Specialist', company: 'Irembo', location: 'Remote', type: 'Contract', salary: 'Competitive', skillMatch: 78 },
        { title: 'Data Scientist', company: 'Zipline', location: 'Muhanga', type: 'Full-time', salary: 'Excellent', skillMatch: 88 },
        { title: 'Marketing Lead', company: 'Ampersand', location: 'Kigali', type: 'Full-time', salary: 'RWF 1.8M - 2.5M', skillMatch: 70 },
        { title: 'Human Resources Manager', company: 'Marriott', location: 'Kigali', type: 'Full-time', salary: 'Negotiable', skillMatch: 65 },
    ];
    const [salaryRange, setSalaryRange] = useState(5);
    return (
        <div className="bg-gray-50 dark:bg-gray-900/80 pt-28 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold font-display text-gray-900 dark:text-white">Find Your Next Opportunity</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Search through thousands of curated job openings from top employers in Rwanda.</p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="lg:w-1/4">
                        <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 space-y-6 sticky top-28">
                            <h3 className="text-xl font-bold font-display">Filter Jobs</h3>
                            <FilterInput label="Keywords">
                                <input type="text" placeholder="Job title or company" className="mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-brand-blue focus:border-brand-blue"/>
                            </FilterInput>
                            <FilterInput label="Location">
                                <select className="mt-1 w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-brand-blue focus:border-brand-blue">
                                    <option>All Rwanda</option>
                                    <option>Kigali</option>
                                    <option>Musanze</option>
                                    <option>Rubavu</option>
                                    <option>Remote</option>
                                </select>
                            </FilterInput>
                            <FilterInput label={`Salary Range (Up to RWF ${salaryRange}M)`}>
                                <input type="range" min="0" max="10" value={salaryRange} onChange={e => setSalaryRange(Number(e.target.value))} className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                            </FilterInput>
                            <FilterInput label="Job Type">
                                <div className="space-y-2 mt-1">
                                    <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"/> <span className="ml-2 text-sm">Full-time</span></label>
                                    <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"/> <span className="ml-2 text-sm">Part-time</span></label>
                                    <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"/> <span className="ml-2 text-sm">Contract</span></label>
                                </div>
                            </FilterInput>
                             <button className="w-full py-3 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg flex items-center justify-center space-x-2">
                                <SearchIcon className="w-5 h-5"/>
                                <span>Search</span>
                            </button>
                        </div>
                    </aside>

                    {/* Job Listings */}
                    <main className="lg:w-3/4">
                        <div className="grid md:grid-cols-2 gap-6">
                            {jobs.map(job => (
                                <JobCard key={job.title} {...job} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
