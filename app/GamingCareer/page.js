"use client";
import React, { useState } from 'react';
import { pcSpecs, csgoClips, cs2Clips, tournamentClips } from '@/lib/data';
import { useChessStats } from '@/hooks/useChessStats';


const GamingCareer = () => {
    const [hoveredSpec, setHoveredSpec] = useState(null);
    const [activeTab, setActiveTab] = useState('csgo');
    const [gameMode, setGameMode] = useState('cs'); // 'cs' or 'chess'

    // Fetch chess stats from API
    const { stats: chessStats, loading: chessLoading, error: chessError, lastUpdated, refreshStats } = useChessStats();

    const VideoCard = ({ clip, index }) => (
        <div
            className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform w-full max-w-sm sm:max-w-md md:max-w-sm lg:max-w-md mx-auto"
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

    const ChessRatingCard = ({ gameType, data, icon }) => {
        const totalGames = data.record.win + data.record.loss + data.record.draw;
        const winRate = totalGames > 0 ? Math.round((data.record.win / totalGames) * 100) : 0;

        return (
            <div className="bg-light-tan rounded-xl shadow-lg p-6 border border-medium-tan hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="text-center">
                    <div className="text-3xl mb-3">{icon}</div>
                    <h4 className="text-lg font-bold text-dark-brown capitalize mb-3">{gameType.replace('chess_', '')}</h4>

                    <div className="bg-cream rounded-lg p-3 mb-4">
                        <div className="text-3xl font-bold text-accent-brown mb-1">{data.last.rating}</div>
                        <div className="text-sm text-brown">Current Rating</div>
                    </div>

                    <div className="text-sm text-dark-brown mb-4">
                        <div className="bg-cream rounded-lg p-2 mb-2">
                            <span className="font-semibold text-dark-brown">Best: {data.best.rating}</span>
                        </div>
                        <div className="text-xs text-brown">
                            Win Rate: <span className="font-semibold text-green-600">{winRate}%</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-green-50 p-2 rounded-lg">
                            <div className="font-bold text-green-700">{data.record.win}</div>
                            <div className="text-green-600">Wins</div>
                        </div>
                        <div className="bg-red-50 p-2 rounded-lg">
                            <div className="font-bold text-red-700">{data.record.loss}</div>
                            <div className="text-red-600">Losses</div>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg">
                            <div className="font-bold text-gray-700">{data.record.draw}</div>
                            <div className="text-gray-600">Draws</div>
                        </div>
                    </div>

                    <div className="mt-3 text-xs text-brown">
                        {totalGames} total games
                    </div>
                </div>
            </div>
        );
    };

    const OpeningCard = ({ opening }) => (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{opening.name}</h4>
                <span className={`w-3 h-3 rounded-full ${opening.color === 'white' ? 'bg-gray-100 border-2 border-gray-400' : 'bg-gray-800'}`}></span>
            </div>
            <div className="text-xs text-gray-600">
                <div>Games: {opening.games}</div>
                <div>Win Rate: <span className="font-semibold text-green-600">{opening.winRate}%</span></div>
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

    const renderCSContent = () => (
        <>
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
            <div className="text-center mt-8 sm:mt-12 md:mt-16 font-quantico">
                <a href='https://allstar.gg/u/Nightmare_fuel?game=7302&view=Clips' target='_blank' rel='noopener noreferrer' className="text-blue-600 hover:text-blue-800 underline transition-colors duration-300">
                    Watch more clips Here
                </a>
            </div>
        </>
    );

    const renderChessContent = () => {
        if (chessLoading) {
            return (
                <div className="max-w-7xl mx-auto text-center mt-12 sm:mt-16 md:mt-20">
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent-brown mb-4"></div>
                        <p className="text-brown">Loading chess stats...</p>
                    </div>
                </div>
            );
        }

        if (chessError) {
            return (
                <div className="max-w-7xl mx-auto text-center mt-12 sm:mt-16 md:mt-20">
                    <div className="bg-cream border border-medium-tan rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-dark-brown mb-2">Error Loading Chess Stats</h3>
                        <p className="text-brown mb-4">{chessError}</p>
                        <button
                            onClick={refreshStats}
                            className="bg-accent-brown text-cream px-4 py-2 rounded-lg hover:bg-brown transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        if (!chessStats) {
            return (
                <div className="max-w-7xl mx-auto text-center mt-12 sm:mt-16 md:mt-20">
                    <p className="text-brown">No chess stats available.</p>
                </div>
            );
        }

        const totalGames = Object.values(chessStats)
            .filter(stat => stat.record)
            .reduce((total, stat) => total + stat.record.win + stat.record.loss + stat.record.draw, 0);

        const totalWins = Object.values(chessStats)
            .filter(stat => stat.record)
            .reduce((total, stat) => total + stat.record.win, 0);

        const totalLosses = Object.values(chessStats)
            .filter(stat => stat.record)
            .reduce((total, stat) => total + stat.record.loss, 0);

        const totalDraws = Object.values(chessStats)
            .filter(stat => stat.record)
            .reduce((total, stat) => total + stat.record.draw, 0);

        const overallWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;

        return (
            <div className="max-w-7xl mx-auto text-center mt-12 sm:mt-16 md:mt-20">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-portfolio-700 mb-4 sm:mb-6 font-quantico">
                    Chess.com Career
                </h2>
                <p className="text-justify text-sm sm:text-base mb-8 sm:mb-12 px-2 sm:px-4 md:px-0">
                    Chess is something i just stumbled upon because of samay raina and becoming a part of the chess community has been a great experience. It helps alot to focus on crucial decisions
                    and sometimes this game is just too much frustrating that u just keep playing because of frustration 😂. Learned some skills from Gotham and his youtube videos. My Favourite Openings if u ask
                    will be Caro-Kann with black and Stone wall with white.
                </p>

                {/* Overall Stats Overview */}
                <div className="mb-12 bg-light-tan rounded-xl shadow-lg p-8 border border-medium-tan">
                    <h3 className="text-2xl font-bold text-dark-brown mb-6">@nightmare_22</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-cream rounded-lg p-4 shadow-md">
                            <div className="text-3xl font-bold text-dark-brown">{totalGames}</div>
                            <div className="text-sm text-brown">Total Games</div>
                        </div>
                        <div className="bg-cream rounded-lg p-4 shadow-md">
                            <div className="text-3xl font-bold text-green-600">{totalWins}</div>
                            <div className="text-sm text-brown">Wins</div>
                        </div>
                        <div className="bg-cream rounded-lg p-4 shadow-md">
                            <div className="text-3xl font-bold text-red-600">{totalLosses}</div>
                            <div className="text-sm text-brown">Losses</div>
                        </div>
                        <div className="bg-cream rounded-lg p-4 shadow-md">
                            <div className="text-3xl font-bold text-blue-600">{overallWinRate}%</div>
                            <div className="text-sm text-brown">Win Rate</div>
                        </div>
                    </div>

                    {lastUpdated && (
                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-xs text-brown">
                                Last updated: {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}
                            </p>
                            <button
                                onClick={refreshStats}
                                className="text-xs bg-medium-tan hover:bg-cream text-dark-brown px-3 py-1 rounded-full transition-colors"
                            >
                                Refresh Stats
                            </button>
                        </div>
                    )}
                </div>

                {/* Game Mode Ratings */}
                <div className="mb-12">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-portfolio-700 mb-8 font-geo">
                        Current Ratings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {chessStats.chess_rapid && (
                            <ChessRatingCard
                                gameType="chess_rapid"
                                data={chessStats.chess_rapid}
                                icon="🏃‍♂️"
                            />
                        )}
                        {chessStats.chess_blitz && (
                            <ChessRatingCard
                                gameType="chess_blitz"
                                data={chessStats.chess_blitz}
                                icon="⚡"
                            />
                        )}
                        {chessStats.chess_bullet && (
                            <ChessRatingCard
                                gameType="chess_bullet"
                                data={chessStats.chess_bullet}
                                icon="🎯"
                            />
                        )}
                    </div>
                </div>

                {/* Additional Stats */}
                {(chessStats.tactics || chessStats.puzzle_rush) && (
                    <div className="mb-12">
                        <h3 className="text-xl sm:text-2xl font-bold text-portfolio-700 mb-6">
                            Training & Puzzles
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {chessStats.tactics && (
                                <div className="bg-cream rounded-xl shadow-lg p-6 border border-light-tan">
                                    <div className="text-center">
                                        <div className="text-3xl mb-3">🧩</div>
                                        <h4 className="text-lg font-bold text-dark-brown mb-4">Tactics Training</h4>
                                        <div className="grid grid-cols-1 gap-3">
                                            <div className="bg-light-tan rounded-lg p-3">
                                                <div className="text-2xl font-bold text-accent-brown">{chessStats.tactics.highest.rating}</div>
                                                <div className="text-sm text-brown">Highest Rating</div>
                                            </div>
                                            <div className="bg-medium-tan rounded-lg p-3">
                                                <div className="text-lg font-semibold text-dark-brown">{chessStats.tactics.lowest.rating}</div>
                                                <div className="text-sm text-brown">Starting Rating</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {chessStats.puzzle_rush && (
                                <div className="bg-cream rounded-xl shadow-lg p-6 border border-light-tan">
                                    <div className="text-center">
                                        <div className="text-3xl mb-3">🚀</div>
                                        <h4 className="text-lg font-bold text-dark-brown mb-4">Puzzle Rush</h4>
                                        <div className="bg-light-tan rounded-lg p-4">
                                            <div className="text-2xl font-bold text-accent-brown mb-2">
                                                {chessStats.puzzle_rush.best.score}/{chessStats.puzzle_rush.best.total_attempts}
                                            </div>
                                            <div className="text-sm text-brown">Best Score</div>
                                            <div className="text-xs text-brown mt-1">
                                                {Math.round((chessStats.puzzle_rush.best.score / chessStats.puzzle_rush.best.total_attempts) * 100)}% accuracy
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="text-center mt-8 sm:mt-12 md:mt-16 font-quantico">
                    <a href="https://chess.com/member/nightmare_22" target='_blank' rel='noopener noreferrer' className="text-blue-600 hover:text-blue-800 underline transition-colors duration-300">
                        View my chess.com profile
                    </a>
                </div>
            </div>
        );
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
                            src="/pc.jpeg"
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

                {/* Game Mode Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="bg-cream rounded-lg shadow-lg border border-light-tan p-1 flex">
                        <button
                            onClick={() => setGameMode('cs')}
                            className={`w-32 py-3 rounded-md font-semibold transition-all duration-300 text-sm cursor-pointer ${gameMode === 'cs'
                                ? 'bg-accent-brown text-cream shadow-md'
                                : 'text-dark-brown hover:bg-light-tan'
                                }`}
                        >
                            Counter-Strike
                        </button>
                        <button
                            onClick={() => setGameMode('chess')}
                            className={`w-32 py-3 rounded-md font-semibold transition-all duration-300 ml-1 text-sm cursor-pointer ${gameMode === 'chess'
                                ? 'bg-accent-brown text-cream shadow-md'
                                : 'text-dark-brown hover:bg-light-tan'
                                }`}
                        >
                            Chess
                        </button>
                    </div>
                </div>

                {/* Conditional Content */}
                {gameMode === 'cs' ? renderCSContent() : renderChessContent()}

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