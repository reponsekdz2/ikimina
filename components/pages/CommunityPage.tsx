import React, { useState } from 'react';
import { CommunityPost } from '../../types';
import { UsersIcon, XIcon } from '../IconComponents';

const mockPosts: CommunityPost[] = [
    { id: 1, author: 'Amahoro J.', avatarUrl: 'https://i.pravatar.cc/48?u=aj', content: 'Excited to share that our Ikimina group reached its savings goal! We are starting a new agribusiness project next month. #Empowerment #MadeInRwanda', likes: 25, comments: 4 },
    { id: 2, author: 'Kigali Corp', avatarUrl: 'https://i.pravatar.cc/48?u=kc', content: 'We are hiring for a new marketing role! Check out the jobs page for more details. Looking for creative minds to join our team.', likes: 12, comments: 2 },
];

const PostCard: React.FC<{post: CommunityPost}> = ({post}) => (
    <div className="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center mb-3">
            <img src={post.avatarUrl} alt={post.author} className="w-12 h-12 rounded-full mr-4"/>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{post.author}</h4>
            </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
        <div className="flex space-x-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
            <button className="hover:text-brand-blue">Like ({post.likes})</button>
            <button className="hover:text-brand-green">Comment ({post.comments})</button>
        </div>
    </div>
)

const Calendar: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, date.getMonth(), 1).getDay();

    return (
        <div className="p-4 bg-white/30 dark:bg-gray-800/30 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">{month} {year}</h4>
                {/* Add controls here */}
            </div>
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                {days.map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 text-center mt-2">
                {Array.from({length: firstDayOfMonth}).map((_, i) => <div key={`empty-${i}`}></div>)}
                {Array.from({length: daysInMonth}).map((_, i) => (
                    <div key={i+1} className={`p-1.5 rounded-full cursor-pointer ${i+1 === date.getDate() ? 'bg-brand-blue text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{i+1}</div>
                ))}
            </div>
        </div>
    )
}

export const CommunityPage: React.FC = () => {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Community Hub</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">Connect, share, and grow with others.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                        <textarea className="w-full p-2 bg-transparent focus:outline-none" placeholder="Share your success story..."></textarea>
                        <button className="mt-2 w-full py-2 font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-green rounded-lg">Post</button>
                    </div>
                    {mockPosts.map(post => <PostCard key={post.id} post={post} />)}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold font-display mb-2">Upcoming Events</h3>
                        <Calendar />
                        <ul className="mt-4 text-sm space-y-2">
                            <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-brand-green mr-2"></span> Webinar: Financial Literacy</li>
                            <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-brand-blue mr-2"></span> Kigali Tech Meetup</li>
                        </ul>
                    </div>
                     <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold font-display mb-2">Forum Topics</h3>
                        <ul className="space-y-1 text-sm text-brand-blue dark:text-cyan-400">
                            <li><a href="#" className="hover:underline">#JobSearchTips</a></li>
                            <li><a href="#" className="hover:underline">#SavingsStrategies</a></li>
                            <li><a href="#" className="hover:underline">#BusinessIdeas</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};