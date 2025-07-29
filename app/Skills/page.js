"use client";
import React from 'react'
import { achievements, skillCategories } from '@/lib/data' // Adjust the import path as needed


const Skills = () => {
    return (
        <div> 
            <section id="skills" className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-portfolio-50 to-portfolio-100 relative overflow-hidden'>

                <div className='max-w-7xl mx-auto'>

                    <div className='text-center mb-12 sm:mb-16 md:mb-20'>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-chakra text-portfolio-700 mb-4 sm:mb-6'>
                            Technical Versatility
                        </h2>
                        <p className='text-base sm:text-lg md:text-xl text-portfolio-600 max-w-3xl mx-auto font-signika'>
                            A comprehensive toolkit spanning multiple domains of software development
                        </p>
                    </div>


                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 sm:mb-16 md:mb-20 font-kanit relative'>

                        <div className='absolute -top-6 -left-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-medium-tan/30 rounded-full -z-10'></div>
                        <div className='absolute -bottom-6 -right-8 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 -z-10'>
                            <div className='w-full h-full border-2 border-medium-tan/30 transform rotate-45'></div>
                        </div>

                        {achievements.map((achievement, index) => (
                            <div key={index} className='text-center p-6 bg-white/80 rounded-xl border border-portfolio-200 shadow-portfolio hover:shadow-portfolio-lg transition-all duration-300 hover:scale-105'>
                                <div className='text-2xl sm:text-3xl md:text-4xl font-bold text-portfolio-700 mb-2'>
                                    {achievement.number}
                                </div>
                                <div className='text-sm sm:text-base font-medium text-portfolio-600 mb-1'>
                                    {achievement.label}
                                </div>
                                <div className='text-xs sm:text-sm text-portfolio-500'>
                                    {achievement.platform}
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 relative'>

                        <div className='absolute top-1/4 -left-10 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 -z-10'>
                            <div className='w-full h-full border-2 border-medium-tan/30 transform rotate-45'></div>
                        </div>
                        <div className='absolute top-2/3 -right-10 w-18 h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-medium-tan/25 rounded-full -z-10'></div>
                        <div className='absolute bottom-10 left-1/3 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 -z-10'>
                            <div className='w-full h-full border-2 border-medium-tan/25 transform rotate-45'></div>
                        </div>

                        {skillCategories.map((category, categoryIndex) => (
                            <div
                                key={categoryIndex}
                                className='bg-white/90 rounded-2xl p-6 sm:p-8 border border-portfolio-200 shadow-portfolio hover:shadow-portfolio-lg transition-all duration-300 hover:scale-102'
                            >

                                <div className='mb-6'>
                                    <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-portfolio-700 mb-3'>
                                        {category.title}
                                    </h3>
                                    <p className='text-sm sm:text-base text-portfolio-600 leading-relaxed'>
                                        {category.description}
                                    </p>
                                </div>


                                <div className='grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6'>
                                    {category.skills.map((skill, skillIndex) => (
                                        <div
                                            key={skillIndex}
                                            className='group flex flex-col items-center p-3 sm:p-4 bg-portfolio-50 hover:bg-white rounded-lg border border-portfolio-200 hover:border-portfolio-300 transition-all duration-300 hover:scale-110 hover:shadow-md'
                                        >

                                            <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 flex items-center justify-center'>
                                                {skill.icon.startsWith('http') ? (
                                                    <img
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-300'
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : (
                                                    <span className='text-xl sm:text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300'>
                                                        {skill.icon}
                                                    </span>
                                                )}

                                                <div className='hidden w-full h-full bg-portfolio-300 rounded items-center justify-center text-portfolio-700 font-bold text-xs'>
                                                    {skill.name.charAt(0)}
                                                </div>
                                            </div>


                                            <span className='text-xs sm:text-sm font-medium text-portfolio-700 text-center leading-tight group-hover:text-portfolio-600 transition-colors duration-300'>
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className='mt-12 sm:mt-16 md:mt-20 text-center relative'>

                        <div className='absolute -top-8 left-1/4 w-10 h-10 sm:w-12 sm:h-12 border-2 border-medium-tan/30 rounded-full -z-10'></div>
                        <div className='absolute -bottom-8 right-1/4 w-8 h-8 sm:w-10 sm:h-10 -z-10'>
                            <div className='w-full h-full border-2 border-medium-tan/30 transform rotate-45'></div>
                        </div>

                        <div className='inline-flex items-center gap-3 px-6 py-3 bg-portfolio-700 text-dark-tan rounded-full hover:bg-portfolio-600 transition-colors duration-300 cursor-pointer'>
                            <span className='text-sm sm:text-base font-medium'><a href='#contact'>Wanna Build Together just hit me up</a>?</span>
                            <span className='animate-bounce'>🚀</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Skills