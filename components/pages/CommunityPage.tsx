import React, { useState } from 'react';
import { UserIcon, LightbulbIcon, MessageSquareIcon, CalendarIcon } from '../IconComponents';
import { Page } from '../../types';

interface CommunityPageProps {
  onNavigate: (page: Page) => void;
}

const PostCard: React.FC<{name: string, role: string, time: string, content: string, likes: number, comments: number}> = (props) => (
    <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-500" />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{props.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{props.role} • {props.time}</p>
            </div>
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{props.content}</p>
        <div className="mt-4 flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <button className="hover:text-brand-blue">👍 {props.likes} Likes</button>
            <button className="hover:text-brand-blue">💬 {props.comments} Comments</button>
            <button className="hover:text-brand-blue"><MessageSquareIcon className="w-4 h-4 inline-block mr-1"/> Message</button>
        </div>
    </div>
);

const PitchCard: React.FC<{title: string, author: string, votes: number}> = ({title, author, votes}) => (
    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700/50">
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">by {author}</p>
        <div className="mt-2 flex justify-between items-center">
            <span className="font-bold text-brand-green">{votes} Votes</span>
            <button className="text-sm font-semibold text-brand-blue hover:underline">Discuss</button>
        </div>
    </div>
);

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
    const posts = [
        { name: "Aline Uwase", role: "Frontend Developer", time: "2h ago", content: "Just landed a new job through KaziConnect! Thank you to this amazing community for the interview tips and support. Don't give up!", likes: 125, comments: 18 },
        { name: "Jean Bosco", role: "Entrepreneur", time: "1d ago", content: "Looking for a co-founder with a tech background for a new agri-tech startup idea. The goal is to optimize crop yields using data analytics. DM me if you're interested!", likes: 48, comments: 22 },
    ];
    
    return (
        <div className="bg-gray-50 dark:bg-gray-900/80 pt-28 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold font-display text-gray-900 dark:text-white">KaziConnect Community</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Connect with peers, ask questions, find mentors, and grow together.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <main className="lg:col-span-2 space-y-6">
                        <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                            <textarea className="w-full p-2 bg-transparent rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:ring-brand-blue focus:border-brand-blue" placeholder="Share your thoughts or ask a question..."></textarea>
                            <button className="mt-2 px-6 py-2 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Post</button>
                        </div>
                        {posts.map(post => <PostCard key={post.name + post.time} {...post} />)}
                    </main>

                    <aside className="lg:col-span-1 sticky top-28 space-y-6">
                         <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4 flex items-center"><LightbulbIcon className="w-6 h-6 mr-2 text-brand-yellow"/> Startup Pitch Zone</h3>
                            <div className="space-y-3">
                                <PitchCard title="Agri-Tech Data Platform" author="Jean B." votes={48} />
                                <PitchCard title="Mobile Money for Schools" author="Grace I." votes={32} />
                            </div>
                         </div>
                         <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-4 flex items-center"><CalendarIcon className="w-6 h-6 mr-2"/> Upcoming Events</h3>
                             <ul className="space-y-3 text-sm">
                                <li className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-md"><strong>Nov 15:</strong> Webinar on CV Writing</li>
                                <li className="p-2 bg-green-50 dark:bg-green-900/50 rounded-md"><strong>Nov 22:</strong> Tech Networking Meetup</li>
                             </ul>
                         </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};
