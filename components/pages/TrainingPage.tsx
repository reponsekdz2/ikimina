import React from 'react';
import { Course } from '../../types';
import { CertificateIcon, TargetIcon } from '../IconComponents';

const mockCourses: Course[] = [
    { id: 1, title: 'Digital Marketing Fundamentals', instructor: 'Ineza Codes', duration: '6 Weeks', imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=800' },
    { id: 2, title: 'Advanced Agri-business Management', instructor: 'AgriPro Rwanda', duration: '12 Weeks', imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38AD449?q=80&w=800' },
    { id: 3, title: 'Mobile App Development with React Native', instructor: 'Kigali Tech Hub', duration: '8 Weeks', imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800' },
];

const CourseCard: React.FC<{course: Course}> = ({ course }) => (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md overflow-hidden group">
        <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-4">
            <h3 className="font-bold text-gray-900 dark:text-white">{course.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.instructor} • {course.duration}</p>
            <button className="mt-4 w-full py-2 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Start Learning</button>
        </div>
    </div>
);

const PitchCard: React.FC<{title: string, author: string}> = ({ title, author }) => (
    <div className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">by {author}</p>
        <div className="flex space-x-2 mt-4">
            <button className="flex-1 py-2 text-sm font-semibold bg-gray-200 dark:bg-gray-700 rounded-lg">Vote (12)</button>
            <button className="flex-1 py-2 text-sm font-semibold bg-gray-200 dark:bg-gray-700 rounded-lg">Comment</button>
        </div>
    </div>
);

export const TrainingPage: React.FC = () => {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Training & Entrepreneurship</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Upskill and bring your ideas to life.</p>
            </div>

            {/* Courses Section */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold font-display mb-4">Available Courses</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCourses.map(course => <CourseCard key={course.id} course={course} />)}
                </div>
            </div>

            {/* My Certificates Section */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold font-display mb-4">My Certificates</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Unlocked Certificate */}
                    <div className="p-4 flex flex-col items-center text-center rounded-xl bg-yellow-100 dark:bg-yellow-900/50 border-2 border-brand-yellow">
                        <CertificateIcon className="w-12 h-12 text-brand-yellow"/>
                        <p className="mt-2 font-semibold text-sm">Digital Marketing</p>
                    </div>
                     {/* Locked Certificate */}
                    <div className="p-4 flex flex-col items-center text-center rounded-xl bg-gray-100 dark:bg-gray-800 opacity-60">
                        <CertificateIcon className="w-12 h-12 text-gray-400"/>
                        <p className="mt-2 font-semibold text-sm text-gray-500">Agri-business</p>
                    </div>
                </div>
            </div>

            {/* Startup Pitch Zone */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold font-display">Startup Pitch Zone</h2>
                    <button className="font-semibold text-white bg-brand-green px-4 py-2 rounded-lg flex items-center space-x-2"><TargetIcon className="w-5 h-5"/><span>Pitch Idea</span></button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <PitchCard title="Eco-friendly Packaging Solution" author="Gatete R."/>
                    <PitchCard title="Tourism Experience App" author="Mukamana C."/>
                </div>
            </div>
        </div>
    );
};
