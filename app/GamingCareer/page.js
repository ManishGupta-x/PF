"use client";
import React, { useState } from 'react';
import { pcSpecs, csgoClips, cs2Clips,tournamentClips } from '@/lib/data'; 


const GamingCareer = () => {
    const [hoveredSpec, setHoveredSpec] = useState(null);
    const [activeTab, setActiveTab] = useState('csgo');

    const VideoCard = ({ clip, index }) => (
        <div
            className=" bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform  w-full max-w-sm sm:max-w-md md:max-w-sm lg:max-w-md mx-auto"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="relative overflow-hidden">
                <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${clip.videoId}`}
                    title={clip.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-48 sm:h-52 md:h-48 lg:h-56 transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-3 sm:p-4">
                <h4 className="font-semibold text-xs sm:text-sm md:text-base group-hover:text-blue-600 transition-colors duration-300">
                    {clip.title}
                </h4>
            </div>
        </div>
    );

    const getClipsForActiveTab = () => {
        switch (activeTab) {
            case 'csgo':
                return csgoClips;
            case 'cs2':
                return cs2Clips;
            case 'tournament':
                return tournamentClips;
            default:
                return csgoClips;
        }
    };

    return (
        <div className="px-4 py-8 font-signika">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-portfolio-700 mb-4 sm:mb-6 font-quantico">
                        My Setup
                    </h2>
                </div>

                
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24">
                    <div className="w-full max-w-[640px] lg:w-1/2 border-4 border-border relative overflow-hidden rounded-lg shadow-lg aspect-video group">
                        <img
                            src="/hero.jpg"
                            alt="Gaming Career"
                            width={640}
                            height={442}
                            className="w-full h-full object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 text-center lg:text-left flex justify-center lg:justify-end">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-4">PC Specs</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-4">
                                <div className="space-y-3 sm:space-y-4">
                                    {pcSpecs.slice(0, 6).map((item, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-start space-x-2 p-2 rounded-md transition-all duration-300 cursor-pointer ${hoveredSpec === index
                                                ? 'bg-gray-100 shadow-md transform scale-105'
                                                : 'hover:bg-gray-50'
                                                }`}
                                            onMouseEnter={() => setHoveredSpec(index)}
                                            onMouseLeave={() => setHoveredSpec(null)}
                                        >
                                            <div className="bg-dark-brown w-2 h-2 rounded-full flex-shrink-0" />
                                            <span className="text-sm sm:text-base">
                                                <span className="font-medium text-primary">{item.component}:</span>{' '}
                                                <span className="font-medium text-portfolio-700">{item.spec}</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {pcSpecs.slice(6).map((item, index) => (
                                        <div
                                            key={index + 6}
                                            className={`flex items-center justify-start space-x-2 p-2 rounded-md transition-all duration-300 cursor-pointer ${hoveredSpec === index + 6
                                                ? 'bg-gray-100 shadow-md transform scale-105'
                                                : 'hover:bg-gray-50'
                                                }`}
                                            onMouseEnter={() => setHoveredSpec(index + 6)}
                                            onMouseLeave={() => setHoveredSpec(null)}
                                        >
                                            <div className="bg-dark-brown w-2 h-2 rounded-full flex-shrink-0" />
                                            <span className="text-sm sm:text-base">
                                                <span className="font-medium text-primary">{item.component}:</span>{' '}
                                                <span className="font-medium text-portfolio-700">{item.spec}</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-dark-brown opacity-20 lg:mx-48 mx-10 my-10" />

                
                <div className="max-w-7xl mx-auto text-center mt-12 sm:mt-16 md:mt-20">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-portfolio-700 mb-4 sm:mb-6 font-quantico">
                        CSGO and CS2 Career
                    </h2>
                    <p className="text-justify text-sm sm:text-base mb-8 sm:mb-12 px-2 sm:px-4 md:px-0">
                        I have been playing CSGO since 2021 and CS2 since its release in 2023. I got alot of friends and connections through this game and i have around 4k+ Hours of gameplay.
                        I love the game because of its complexity and not everyone gets that and if u are good enough to think at max level u become a pro. It&apos;s not only a game but a way to meet people and find different kind of people
                        across the world and talk about there life in general and u get to know alot from them and their experiences.
                    </p>


                    <div className="mb-12 sm:mb-16">
                        <div className="flex justify-center items-center gap-20">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-portfolio-700 font-geo">
                                Rank
                            </h3>
                            <div className="relative">
                                <img    
                                    src="/LEM.png"
                                    alt="Legendary Eagle Master Rank"
                                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain filter drop-shadow-lg"
                                />
                                <p className="font-signika absolute lg:bottom-7 bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-portfolio-700 font-medium whitespace-nowrap">
                                    Legendary Eagle Master
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center mb-8">
                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-1">
                            <button
                                onClick={() => setActiveTab('csgo')}
                                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 text-xs sm:text-sm cursor-pointer ${activeTab === 'csgo'
                                    ? 'bg-amber-800 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                CSGO Highlights
                            </button>
                            <button
                                onClick={() => setActiveTab('cs2')}
                                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 ml-1 text-xs sm:text-sm cursor-pointer ${activeTab === 'cs2'
                                    ? 'bg-amber-800 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                CS2 Highlights
                            </button>
                            <button
                                onClick={() => setActiveTab('tournament')}
                                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-md font-semibold transition-all duration-300 ml-1 text-xs sm:text-sm cursor-pointer ${activeTab === 'tournament'
                                    ? 'bg-amber-800 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Tournament Matches
                            </button>
                        </div>
                    </div>

                    
                    <div className="mb-12 sm:mb-16">
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            {getClipsForActiveTab().map((clip, index) => (
                                <VideoCard key={clip.videoId} clip={clip} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-dark-brown opacity-20 lg:mx-48 mx-10 my-10" />
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .group {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default GamingCareer;