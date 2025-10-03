
import React from 'react';

export const TrainerDashboard: React.FC = () => {
    const learners = [
        { name: 'Kevine Ingabire', course: 'Intro to Python', progress: '80%' },
        { name: 'Thierry Mugabo', course: 'Digital Marketing 101', progress: '100%' },
        { name: 'Diane Keza', course: 'Intro to Python', progress: '45%' },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Trainer Dashboard</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Manage Learners</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Learner Name</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Course</th>
                                <th className="p-3 text-sm font-semibold text-gray-500 dark:text-gray-400">Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {learners.map(learner => (
                                <tr key={learner.name} className="border-b border-gray-100 dark:border-gray-700/50">
                                    <td className="p-3 font-medium text-gray-900 dark:text-white">{learner.name}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{learner.course}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{learner.progress}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4">Upload New Course</h3>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="course-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Title</label>
                            <input type="text" id="course-title" className="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
                        </div>
                        <div>
                            <label htmlFor="course-desc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <textarea id="course-desc" rows={3} className="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"></textarea>
                        </div>
                        <div>
                             <label htmlFor="course-file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Materials (.zip)</label>
                            <input type="file" id="course-file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand-blue hover:file:bg-blue-100"/>
                        </div>
                        <button type="submit" className="w-full py-2.5 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Upload Course</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
