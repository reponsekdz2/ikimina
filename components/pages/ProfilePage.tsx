import React, { useState } from 'react';
import { User, Page, Badge } from '../../types';
import { FireIcon, TrophyIcon, CertificateIcon, BriefcaseIcon, DollarSignIcon, TargetIcon, UsersIcon } from '../IconComponents';

interface ProfilePageProps {
  user: User;
  onNavigate: (page: Page) => void;
}

const badges: Badge[] = [
    { id: 'saver1', name: 'Top Saver', description: 'Reached a savings milestone', icon: <TrophyIcon className="w-10 h-10 mx-auto text-yellow-500"/> },
    { id: 'skill1', name: 'Python Skilled', description: 'Completed the Python course', icon: <CertificateIcon className="w-10 h-10 mx-auto text-green-500"/> },
    { id: 'job1', name: 'Active Hunter', description: 'Applied to 10+ jobs', icon: <BriefcaseIcon className="w-10 h-10 mx-auto text-blue-500"/> },
    { id: 'community1', name: 'Contributor', description: 'Made 5+ community posts', icon: <UsersIcon className="w-10 h-10 mx-auto text-purple-500"/> },
];

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onNavigate }) => {
    const [activeTab, setActiveTab] = useState('cv');

    return (
        <div className="bg-gray-50 dark:bg-gray-900/80 pt-28 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <aside className="lg:col-span-1">
                        <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-center sticky top-28">
                             <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-brand-blue">
                                {user.name.charAt(0)}
                             </div>
                             <h1 className="text-2xl font-bold font-display">{user.name}</h1>
                             <p className="text-gray-500 dark:text-gray-400">{user.role}</p>

                             <div className="mt-4">
                                <p className="text-sm font-medium">Profile Completion: 75%</p>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                                    <div className="bg-gradient-to-r from-brand-green to-brand-yellow h-2.5 rounded-full" style={{ width: `75%` }}></div>
                                </div>
                             </div>

                             <div className="mt-6 text-left space-y-2">
                                <button onClick={() => setActiveTab('cv')} className={`w-full text-left p-2 rounded-md font-semibold ${activeTab === 'cv' ? 'bg-brand-blue text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>My CV & Portfolio</button>
                                <button onClick={() => setActiveTab('badges')} className={`w-full text-left p-2 rounded-md font-semibold ${activeTab === 'badges' ? 'bg-brand-blue text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>My Achievements</button>
                                <button onClick={() => setActiveTab('settings')} className={`w-full text-left p-2 rounded-md font-semibold ${activeTab === 'settings' ? 'bg-brand-blue text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Settings</button>
                             </div>
                        </div>
                    </aside>
                    <main className="lg:col-span-2">
                        {activeTab === 'cv' && <CVBuilderSection />}
                        {activeTab === 'badges' && <BadgesSection />}
                        {activeTab === 'settings' && <SettingsSection />}
                    </main>
                </div>
            </div>
        </div>
    );
}

const CVBuilderSection = () => (
    <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold font-display mb-4">Digital CV Builder</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <h3 className="font-bold mb-2">Personal Information</h3>
                <input type="text" placeholder="Full Name" className="w-full p-2 mb-2 rounded-md border bg-transparent" defaultValue="Aline Uwase" />
                <input type="text" placeholder="Professional Title" className="w-full p-2 mb-2 rounded-md border bg-transparent" defaultValue="Frontend Developer" />

                 <h3 className="font-bold mt-4 mb-2">Experience</h3>
                <textarea placeholder="Your experience..." rows={4} className="w-full p-2 mb-2 rounded-md border bg-transparent"></textarea>
                
                 <h3 className="font-bold mt-4 mb-2">Portfolio</h3>
                <div className="p-4 border-2 border-dashed rounded-lg text-center">
                    <p>Drag & drop projects, certificates, images or videos</p>
                    <button className="mt-2 text-sm text-brand-blue font-semibold">Upload Files</button>
                </div>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
                <h3 className="text-lg font-bold">Aline Uwase</h3>
                <p className="font-semibold text-brand-green">Frontend Developer</p>
                <hr className="my-2"/>
                <p className="text-sm">Live preview of your CV will appear here as you type...</p>
            </div>
        </div>
        <button className="mt-6 px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Export to PDF</button>
    </div>
);

const BadgesSection = () => (
     <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold font-display mb-4">My Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map(badge => (
                <div key={badge.id} className="text-center p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    {badge.icon}
                    <p className="text-sm font-bold mt-1">{badge.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                </div>
            ))}
        </div>
    </div>
);

const SettingsSection = () => (
     <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 space-y-6">
        <h2 className="text-2xl font-bold font-display">Settings</h2>
        <div>
            <h3 className="font-semibold">Language</h3>
            <div className="mt-2 flex space-x-2">
                <button className="px-3 py-1 text-sm rounded-full bg-brand-blue text-white">Kinyarwanda</button>
                <button className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700">English</button>
                <button className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700">Français</button>
            </div>
        </div>
        <div>
            <h3 className="font-semibold">Job Alerts</h3>
            <label className="flex items-center mt-2 cursor-pointer">
                <div className="relative">
                    <input type="checkbox" className="sr-only" defaultChecked/>
                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                </div>
                <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">Push Notifications</div>
            </label>
        </div>
         <div>
            <h3 className="font-semibold">Security</h3>
            <button className="mt-2 px-4 py-2 text-sm font-semibold text-brand-blue border border-brand-blue rounded-lg">Change Phone Number</button>
        </div>
    </div>
);
