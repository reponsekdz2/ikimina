import React from 'react';
import { TrainingModule } from '../../types';
import { RippleButton } from '../common/RippleButton';

const mockModules: TrainingModule[] = [
    { id: '1', title: 'Introduction to Digital Marketing', provider: 'Google Digital Skills', duration: '4 hours', isCompleted: true, description: 'Learn the fundamentals of digital marketing to help your business or career.', progress: 100 },
    { id: '2', title: 'Advanced Customer Service Skills', provider: 'Rwanda Polytechnic', duration: '2 weeks', isCompleted: false, description: 'Master the art of customer satisfaction and retention.', progress: 25 },
    { id: '3', title: 'Financial Literacy for Entrepreneurs', provider: 'Bank of Kigali', duration: '3 hours', isCompleted: false, description: 'Understand budgeting, saving, and investing for your small business.', progress: 0 },
];

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div className="bg-[#32CD32] h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
    </div>
);

const ModuleCard: React.FC<{module: TrainingModule}> = ({module}) => (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 transition-transform duration-300">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-[#1E90FF] dark:text-[#FFD700]">{module.title}</h3>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${module.isCompleted ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>
                {module.isCompleted ? 'Completed' : 'In Progress'}
            </span>
        </div>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">By {module.provider}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-400">{module.description}</p>
        <div className="mt-4 space-y-2">
            <ProgressBar progress={module.progress} />
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">{module.duration}</span>
                <RippleButton className={`text-sm font-semibold text-white rounded-full ${module.isCompleted ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#32CD32] to-[#20B2AA] hover:shadow-lg hover:shadow-green-500/40'}`}>
                    {module.progress > 0 && !module.isCompleted ? 'Continue Course' : module.isCompleted ? 'Review' : 'Start Course'}
                </RippleButton>
            </div>
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