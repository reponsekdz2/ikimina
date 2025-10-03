import React from 'react';
import { TrainingModule } from '../../types';

const mockModules: TrainingModule[] = [
    { id: '1', title: 'Introduction to Digital Marketing', provider: 'Google Digital Skills', duration: '4 hours', isCompleted: true, description: 'Learn the fundamentals of digital marketing to help your business or career.' },
    { id: '2', title: 'Advanced Customer Service Skills', provider: 'Rwanda Polytechnic', duration: '2 weeks', isCompleted: false, description: 'Master the art of customer satisfaction and retention.' },
    { id: '3', title: 'Financial Literacy for Entrepreneurs', provider: 'Bank of Kigali', duration: '3 hours', isCompleted: false, description: 'Understand budgeting, saving, and investing for your small business.' },
];

const ModuleCard: React.FC<{module: TrainingModule}> = ({module}) => (
    <div className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-brand-blue dark:text-brand-yellow">{module.title}</h3>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">By {module.provider}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-400">{module.description}</p>
        <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">{module.duration}</span>
            <button className={`px-4 py-2 text-sm font-semibold text-white rounded-lg ${module.isCompleted ? 'bg-gray-500' : 'bg-brand-green'}`}>
                {module.isCompleted ? 'Completed' : 'Start Course'}
            </button>
        </div>
    </div>
);

export const TrainingPage: React.FC = () => {
    return (
         <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Enhance Your Skills</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Access training modules to boost your employability.</p>
            </div>
            <div className="space-y-6">
                {mockModules.map(mod => <ModuleCard key={mod.id} module={mod} />)}
            </div>
        </div>
    );
};
