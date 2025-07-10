"use client"
import React from 'react'

const Skills = () => {
    const skillCategories = [
        {
            title: "Programming Languages",
            description: "C/C++ (Advanced), JavaScript/TypeScript (Expert), Java, Python, HTML/CSS, SQL",
            skills: [
                { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
                { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
            ]
        },
        {
            title: "Full-Stack Development",
            description: "React.js, Next.js, Node.js, Express.js, MongoDB, MySQL, REST APIs, WebSockets, Tailwind CSS",
            skills: [
                { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
                { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },


            ]
        },
        {
            title: "Cross-Domain Expertise",
            description: "Data Structures & Algorithms, System Design, Database Architecture, Network Programming, Security Fundamentals",
            skills: [
                { name: "Algorithms", icon: "🧮" },
                { name: "System Design", icon: "🏗️" },
                { name: "Database", icon: "🗄️" },
                { name: "Network", icon: "🌐" },
                { name: "Security", icon: "🔒" }
            ]
        },
        {
            title: "Tools & Practices",
            description: "Git/GitHub, Postman, Chrome DevTools, CI/CD, Agile Development, Test-Driven Development",
            skills: [
                { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
                { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
                { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },

                { name: "Chrome DevTools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" },
                { name: "Selenium", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" }
            ]
        }
    ]

    const achievements = [
        { number: "500+", label: "Coding Challenges Solved", platform: "LeetCode/CodeChef" },
        { number: "5+", label: "Years of Experience", platform: "Programming" },
        { number: "10+", label: "Technologies Mastered", platform: "Full-Stack" }
    ]

    return (
        <section id="skills" className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-portfolio-50 to-portfolio-100 relative overflow-hidden'>
            
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-12 sm:mb-16 md:mb-20'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-chakra text-portfolio-700 mb-4 sm:mb-6'>
                        Technical Versatility
                    </h2>
                    <p className='text-base sm:text-lg md:text-xl text-portfolio-600 max-w-3xl mx-auto font-signika'>
                        A comprehensive toolkit spanning multiple domains of software development
                    </p>
                </div>

                {/* Achievement Stats */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 sm:mb-16 md:mb-20 font-kanit relative'>
                    {/* Decorative elements around achievements content */}
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

                {/* Skills Categories */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 relative'>
                    {/* Decorative elements around skills content */}
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
                            {/* Category Header */}
                            <div className='mb-6'>
                                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-portfolio-700 mb-3'>
                                    {category.title}
                                </h3>
                                <p className='text-sm sm:text-base text-portfolio-600 leading-relaxed'>
                                    {category.description}
                                </p>
                            </div>

                            {/* Skills Grid */}
                            <div className='grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6'>
                                {category.skills.map((skill, skillIndex) => (
                                    <div
                                        key={skillIndex}
                                        className='group flex flex-col items-center p-3 sm:p-4 bg-portfolio-50 hover:bg-white rounded-lg border border-portfolio-200 hover:border-portfolio-300 transition-all duration-300 hover:scale-110 hover:shadow-md'
                                    >
                                        {/* Icon */}
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
                                            {/* Fallback for broken images */}
                                            <div className='hidden w-full h-full bg-portfolio-300 rounded items-center justify-center text-portfolio-700 font-bold text-xs'>
                                                {skill.name.charAt(0)}
                                            </div>
                                        </div>

                                        {/* Skill Name */}
                                        <span className='text-xs sm:text-sm font-medium text-portfolio-700 text-center leading-tight group-hover:text-portfolio-600 transition-colors duration-300'>
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Call to Action */}
                <div className='mt-12 sm:mt-16 md:mt-20 text-center relative'>
                    {/* Decorative elements around CTA content */}
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
    )
}

export default Skills