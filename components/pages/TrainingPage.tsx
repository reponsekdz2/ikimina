import React, { useState } from 'react';
import { TargetIcon, CertificateIcon } from '../IconComponents';

const CourseCard: React.FC<{course: any, onSelect: (course: any) => void}> = ({course, onSelect}) => {
    const {title, instructor, category, duration, rating} = course;
    return (
        <button onClick={() => onSelect(course)} className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 group text-left w-full">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <TargetIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm font-semibold text-brand-blue dark:text-brand-yellow">{category}</p>
            <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white mt-1 h-14">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">By {instructor}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300">
                <span>{duration}</span>
                <span className="font-bold">⭐ {rating}</span>
            </div>
        </button>
    );
};

const CourseDetailModal: React.FC<{course: any, onClose: () => void}> = ({ course, onClose }) => {
    const lessons = ["Introduction", "Module 1: Core Concepts", "Module 2: Advanced Techniques", "Final Project"];
    const [completed, setCompleted] = useState<string[]>([]);
    
    const toggleLesson = (lesson: string) => {
        setCompleted(prev => prev.includes(lesson) ? prev.filter(l => l !== lesson) : [...prev, lesson]);
    };
    
    const allCompleted = completed.length === lessons.length;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white">&times;</button>
                    <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">{course.title}</h2>
                    <p className="text-gray-500 dark:text-gray-400">By {course.instructor}</p>
                    
                    <div className="mt-6 grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="aspect-video bg-black rounded-lg flex items-center justify-center text-white">
                                Mock Video Player
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <h3 className="font-bold mb-2">Course Content</h3>
                            <ul className="space-y-2">
                                {lessons.map(lesson => (
                                    <li key={lesson}>
                                        <label className="flex items-center p-2 rounded-md bg-gray-100 dark:bg-gray-700/50">
                                            <input type="checkbox" checked={completed.includes(lesson)} onChange={() => toggleLesson(lesson)} className="h-4 w-4 rounded text-brand-blue" />
                                            <span className="ml-2 text-sm">{lesson}</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {allCompleted && (
                        <div className="mt-6 p-6 rounded-lg bg-green-100 dark:bg-green-900/50 text-center">
                            <CertificateIcon className="w-16 h-16 mx-auto text-green-500 mb-2"/>
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-200">Congratulations!</h3>
                            <p className="text-green-700 dark:text-green-300">You've completed the course.</p>
                            <button className="mt-4 px-5 py-2 font-semibold bg-green-600 text-white rounded-lg">Download Certificate</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const TrainingPage: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const courses = [
        { title: 'Digital Marketing Fundamentals', instructor: 'Carnegie Mellon University', category: 'Business', duration: '6 Weeks', rating: 4.8 },
        { title: 'Introduction to Python Programming', instructor: 'ALU', category: 'Tech', duration: '8 Weeks', rating: 4.9 },
        { title: 'Project Management Professional (PMP)', instructor: 'Project Management Institute', category: 'Business', duration: '12 Weeks', rating: 4.7 },
        { title: 'Graphic Design for Beginners', instructor: 'Kigali Arts Center', category: 'Creative', duration: '4 Weeks', rating: 4.6 },
    ];
    return (
        <div className="bg-gray-50 dark:bg-gray-900/80 pt-28 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold font-display text-gray-900 dark:text-white">Expand Your Skills</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Access high-quality courses from top trainers and institutions to accelerate your career.</p>
                </div>

                <div className="flex justify-center space-x-2 md:space-x-4 mb-8">
                    <button className="px-4 py-2 text-sm md:text-base font-semibold rounded-full bg-brand-blue text-white">All Courses</button>
                    <button className="px-4 py-2 text-sm md:text-base font-semibold rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">Tech</button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {courses.map(course => <CourseCard key={course.title} course={course} onSelect={setSelectedCourse} />)}
                </div>

                {selectedCourse && <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
            </div>
        </div>
    );
};
