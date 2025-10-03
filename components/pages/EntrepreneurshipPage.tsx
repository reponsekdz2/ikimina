import React, { useState } from 'react';
import { UserRole } from '../../types';
import { RippleButton } from '../common/RippleButton';
import { LightbulbIcon, SparklesIcon } from '../IconComponents';
import { GoogleGenAI, Type } from '@google/genai';

const mockBusinessIdeas = [
    { id: '1', title: 'Mobile Money Agent', description: 'Offer mobile payment and withdrawal services in your community.', category: 'Finance' },
    { id: '2', title: 'Community Vegetable Garden', description: 'Start a local garden to sell fresh produce to neighbors and local markets.', category: 'Agriculture' },
    { id: '3', title: 'Handmade Crafts E-shop', description: 'Create and sell unique Rwandan crafts online to a global audience.', category: 'E-commerce' },
];

const IdeaCard: React.FC<{ title: string; category?: string, description: string }> = ({ title, category, description }) => (
    <div className="p-5 rounded-2xl card">
        <div className="flex items-start space-x-4">
             <div className="flex-shrink-0 p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-full text-amber-500">
                <LightbulbIcon className="w-6 h-6"/>
            </div>
            <div>
                <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark">{title}</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">{description}</p>
            </div>
        </div>
    </div>
);

export const EntrepreneurshipPage: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
    const [interests, setInterests] = useState('');
    const [generatedIdeas, setGeneratedIdeas] = useState<{title: string, description: string}[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateIdeas = async () => {
        if (!interests.trim()) return;
        setIsGenerating(true);
        setGeneratedIdeas([]);
        try {
            const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Generate 3 simple, low-cost business ideas suitable for the Rwandan market, based on the following interests: '${interests}'.`,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING, description: 'A short, catchy title for the business idea.' },
                                description: { type: Type.STRING, description: 'A one-sentence description of the business idea.' }
                            },
                             required: ['title', 'description']
                        }
                    }
                }
            });
            const ideas = JSON.parse(response.text);
            setGeneratedIdeas(ideas);

        } catch (error) {
            console.error("Error generating ideas:", error);
            // Handle error state in UI if needed
        } finally {
            setIsGenerating(false);
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
             <div>
                <h1 className="text-4xl font-bold font-display text-text-primary-light dark:text-text-primary-dark">Entrepreneurship Hub</h1>
                <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">Learn, pitch, and get funding for your business ideas.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     <div className="p-6 rounded-2xl card">
                        <h3 className="text-xl font-bold font-display text-text-primary-light dark:text-text-primary-dark mb-4">Generate Your Next Big Idea</h3>
                        <div className="flex flex-col sm:flex-row gap-2">
                             <input 
                                type="text" 
                                value={interests}
                                onChange={(e) => setInterests(e.target.value)}
                                placeholder="Enter your interests (e.g. agriculture, tech)" 
                                className="flex-grow p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                            <RippleButton onClick={handleGenerateIdeas} disabled={isGenerating} className="text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full disabled:opacity-50">
                                <span className="flex items-center justify-center space-x-2">
                                    <SparklesIcon className="w-5 h-5"/>
                                    <span>{isGenerating ? 'Generating...' : 'Generate Ideas'}</span>
                                </span>
                            </RippleButton>
                        </div>
                        {isGenerating && <p className="text-center mt-4 text-text-secondary-light dark:text-text-secondary-dark">Thinking of some great ideas for you...</p>}
                        {generatedIdeas.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <h4 className="font-semibold">Here are some ideas based on your interests:</h4>
                                {generatedIdeas.map((idea, i) => <IdeaCard key={i} {...idea} />)}
                            </div>
                        )}
                    </div>

                    <div className="p-6 rounded-2xl card">
                        <h3 className="text-xl font-bold font-display text-text-primary-light dark:text-text-primary-dark mb-4">Simple Business Ideas to Start</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {mockBusinessIdeas.map(idea => <IdeaCard key={idea.id} {...idea} />)}
                        </div>
                    </div>
                </div>
                 <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-blue-500/30">
                        <h3 className="text-xl font-bold font-display">Pitch Your Idea</h3>
                        <p className="mt-2 text-white/90">Have a business idea? Write a simple plan and submit it for review and potential funding from an Ikimina.</p>
                        <RippleButton className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white hover:shadow-lg rounded-full">Start Pitch</RippleButton>
                    </div>
                     <div className="p-6 rounded-2xl card">
                        <h3 className="text-xl font-bold font-display text-text-primary-light dark:text-text-primary-dark mb-4">Your Pitched Ideas</h3>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-center py-4">You haven't pitched any ideas yet. Start by exploring or generating ideas!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}