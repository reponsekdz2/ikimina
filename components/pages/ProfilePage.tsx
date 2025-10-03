import React, { useState } from 'react';
import { Badge, CVSection, Education, Skill, UserRole, WorkExperience } from '../../types';
import { BriefcaseIcon, TrophyIcon, CertificateIcon, GripVerticalIcon, XIcon } from '../IconComponents';

const mockBadges: Badge[] = [
    { id: 1, name: 'Top Saver', description: 'Reached your savings goal 5 times.', unlocked: true, icon: <TrophyIcon/> },
    { id: 2, name: 'Active Job Hunter', description: 'Applied to 10+ jobs.', unlocked: true, icon: <BriefcaseIcon/> },
    { id: 3, name: 'Certified Learner', description: 'Completed 3 courses.', unlocked: false, icon: <CertificateIcon/> },
];

const mockWorkExperience: WorkExperience[] = [{id: 'we1', jobTitle: 'Junior Developer', company: 'Example Inc.', years: '2022-2023', description: 'Worked on web apps.'}];
const mockEducation: Education[] = [{id: 'edu1', degree: 'BSc in Computer Science', institution: 'University of Rwanda', year: '2022'}];
const mockSkills: Skill[] = [{id: 'sk1', name: 'React'}, {id: 'sk2', name: 'Tailwind CSS'}];
const initialCvSections: CVSection[] = [
    {id: 'workExperience', title: 'Work Experience'},
    {id: 'education', title: 'Education'},
    {id: 'skills', title: 'Skills'},
    {id: 'portfolio', title: 'Portfolio'},
]


const BadgeCard: React.FC<{badge: Badge}> = ({ badge }) => (
    <div className={`p-4 flex flex-col items-center text-center rounded-xl transition-all duration-300 ${badge.unlocked ? 'bg-yellow-100 dark:bg-yellow-900/50 border-2 border-brand-yellow' : 'bg-gray-100 dark:bg-gray-800 opacity-60'}`}>
        <div className={`w-12 h-12 ${badge.unlocked ? 'text-brand-yellow' : 'text-gray-400'}`}>{badge.icon}</div>
        <p className="mt-2 font-semibold text-sm">{badge.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
    </div>
);

const CVSectionEditor: React.FC<{ onMove: (direction: 'up' | 'down') => void, children: React.ReactNode, title: string }> = ({ onMove, children, title }) => (
    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900/50 flex">
        <div className="flex flex-col items-center pr-4 space-y-1">
            <button onClick={() => onMove('up')} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">↑</button>
            <GripVerticalIcon className="cursor-grab text-gray-400"/>
            <button onClick={() => onMove('down')} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">↓</button>
        </div>
        <div className="flex-grow">
            <h4 className="font-bold text-lg mb-2">{title}</h4>
            {children}
        </div>
    </div>
);

export const ProfilePage: React.FC = () => {
    const [cvSections, setCvSections] = useState(initialCvSections);
    const [mode, setMode] = useState<'edit' | 'preview'>('edit');

    const moveSection = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === cvSections.length - 1) return;
        const newSections = [...cvSections];
        const to = direction === 'up' ? index - 1 : index + 1;
        [newSections[index], newSections[to]] = [newSections[to], newSections[index]]; // Swap
        setCvSections(newSections);
    };

    const renderSectionContent = (id: CVSection['id']) => {
        switch(id){
            case 'workExperience': return <div>Work Experience Content</div>;
            case 'education': return <div>Education Content</div>;
            case 'skills': return <div>Skills Content</div>;
            case 'portfolio': return <div>Portfolio Content</div>;
        }
    };

    return (
        <div className="space-y-12">
             <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img src="https://i.pravatar.cc/120?u=Aline U." alt="Profile" className="w-32 h-32 rounded-full border-4 border-brand-green shadow-lg"/>
                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Aline U.</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">Job Seeker</p>
                        <p className="mt-2 max-w-xl">Passionate frontend developer with a love for creating beautiful and intuitive user interfaces. Ready for my next challenge!</p>
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold">Profile Completion</h4>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                                <div className="bg-brand-green h-2.5 rounded-full" style={{width: '75%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold font-display mb-4">My Achievements</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   {mockBadges.map(b => <BadgeCard key={b.id} badge={b}/>)}
                </div>
            </div>

            {/* CV Builder */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold font-display">My Digital CV</h2>
                    <div className="flex space-x-2">
                        <button onClick={() => setMode(m => m === 'edit' ? 'preview' : 'edit')} className="px-4 py-2 font-semibold bg-gray-200 dark:bg-gray-700 rounded-lg">{mode === 'edit' ? 'Preview' : 'Edit'}</button>
                        <button className="px-4 py-2 font-semibold text-white bg-brand-blue rounded-lg">Export PDF</button>
                    </div>
                </div>

                {mode === 'edit' ? (
                    <div className="space-y-4">
                       {cvSections.map((section, index) => (
                           <CVSectionEditor key={section.id} title={section.title} onMove={(dir) => moveSection(index, dir)}>
                               {renderSectionContent(section.id)}
                           </CVSectionEditor>
                       ))}
                    </div>
                ) : (
                    <div className="p-8 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900">
                         {cvSections.map(section => (
                            <div key={section.id} className="mb-6">
                                <h3 className="text-xl font-bold text-brand-blue dark:text-brand-yellow border-b-2 border-gray-200 dark:border-gray-700 pb-1 mb-2">{section.title}</h3>
                                {renderSectionContent(section.id)}
                            </div>
                         ))}
                    </div>
                )}
            </div>
        </div>
    );
};
