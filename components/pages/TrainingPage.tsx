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
        <div className="bg-brand-green h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
    </div>
);

const ModuleCard: React.FC<{module: TrainingModule}> = ({module}) => (
    <div className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 transform hover:-translate-y-1 transition-transform duration-300">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-brand-blue dark:text-brand-yellow">{module.title}</h3>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${module.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {module.isCompleted ? 'Completed' : 'In Progress'}
            </span>
        </div>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">By {module.provider}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-400">{module.description}</p>
        <div className="mt-4 space-y-2">
            <ProgressBar progress={module.progress} />
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">{module.duration}</span>
                <RippleButton className={`text-sm font-semibold text-white rounded-lg ${module.isCompleted ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-brand-green to-teal-500 hover:shadow-lg'}`}>
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