"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import Shimmer from './Shimmer'
import { workData, createInitialImageState } from '@/lib/data' // Adjust the import path as needed

const Work = () => {

    const [imageLoaded, setImageLoaded] = useState(createInitialImageState())


    const [imageError, setImageError] = useState(createInitialImageState())

    const handleImageLoad = (imageName) => {
        setImageLoaded(prev => ({ ...prev, [imageName]: true }))
        setImageError(prev => ({ ...prev, [imageName]: false }))
    }

    const handleImageError = (imageName) => {
        setImageError(prev => ({ ...prev, [imageName]: true }))
        setImageLoaded(prev => ({ ...prev, [imageName]: false }))
    }


    const parseBold = (text) => {
        if (!text || !text.includes('**')) return text;
        const parts = text.split(/\*\*(.*?)\*\*/g);
        return parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        );
    };

    const renderContent = (contentBlock, projectImages) => {
        switch (contentBlock.type) {
            case 'paragraph':
                return (
                    <p className='text-sm sm:text-base md:text-lg text-justify px-2 sm:px-0 leading-relaxed '>
                        {parseBold(contentBlock.text)}
                        {contentBlock.links && contentBlock.links.map((link, index) => (
                            <a
                                key={index}
                                className='text-blue-600 hover:underline break-words'
                                href={link.url}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {link.text}
                            </a>
                        ))}
                        {contentBlock.continuation}
                        {contentBlock.additionalLinks && contentBlock.additionalLinks.map((link, index) => (
                            <a
                                key={index}
                                className='text-blue-600 hover:underline break-words'
                                href={link.url}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {link.text}
                            </a>
                        ))}
                        {contentBlock.finalText}
                    </p>
                );

            case 'images':
                const imagesToRender = contentBlock.imageKeys.map(key =>
                    projectImages.find(img => img.key === key)
                ).filter(Boolean);

                return (
                    <div className={`flex flex-col ${imagesToRender.length > 1 ? 'lg:flex-row' : ''} items-center justify-center gap-4 my-8`}>
                        {imagesToRender.map((image, index) => (
                            <div key={index} className="relative">
                                {(!imageLoaded[image.key] || imageError[image.key]) && (
                                    <Shimmer
                                        width={image.width}
                                        height={image.height}
                                        className={`mt-8 ${image.hasBorder ? 'border-2 border-border' : ''}`}
                                    />
                                )}
                                {!imageError[image.key] && (
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        className={`mt-8 rounded-lg shadow-lg ${image.hasBorder ? 'border-2 border-border' : ''} transition-opacity duration-300 ${imageLoaded[image.key] ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                            }`}
                                        width={image.width}
                                        height={image.height}
                                        onLoad={() => handleImageLoad(image.key)}
                                        onError={() => handleImageError(image.key)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                );

            case 'video':
                return (
                    <div className="flex justify-center items-center my-8 sm:mt-12 px-2 sm:px-0">
                        <div className="w-full max-w-2xl">
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                    src={contentBlock.src}
                                    title={contentBlock.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section id="work" className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-portfolio-50 to-portfolio-100 relative overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-12 sm:mb-16 md:mb-20'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-chakra text-portfolio-700 mb-4 sm:mb-6'>
                        {workData.header.title}
                    </h2>
                    <p className='text-base sm:text-lg md:text-xl text-portfolio-600 max-w-3xl mx-auto font-signika px-4'>
                        {workData.header.subtitle}
                    </p>
                </div>
            </div>


            {workData.projects.map((project, projectIndex) => (
                <div key={project.id} className='max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col mt-12 sm:mt-16'>
                    <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-6 sm:mb-8 underline px-2 sm:px-0'>
                        {project.titleLink ? (
                            <a href={project.titleLink} target='_blank' rel='noopener noreferrer' className='break-words'>
                                {project.title}
                            </a>
                        ) : (
                            project.title
                        )}
                    </h2>


                    {project.content.map((contentBlock, index) => (
                        <div key={index} className="mb-5">
                            {contentBlock.type === 'video' ?
                                renderContent({ ...contentBlock, src: project.video?.src, title: project.video?.title }, project.images) :
                                renderContent(contentBlock, project.images || [])
                            }
                        </div>
                    ))}


                    <span className='font-medium text-brown flex justify-center italic mt-4'>
                        Tech Stack : {project.techStack}
                    </span>
                </div>
            ))}


            <div className='text-center mt-12 sm:mt-16 px-4'>
                <h2 className='text-sm sm:text-base md:text-lg text-portfolio-600 font-quantico opacity-85 leading-relaxed'>
                    {workData.footer.text}
                    <a className='text-blue-600 hover:underline ml-2 break-words' href={workData.footer.link.url}>
                        {workData.footer.link.text}
                    </a>
                </h2>
            </div>

            <div className='border-border border-b mt-6 max-w-[95%] sm:max-w-[90%] mx-auto' />

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .shimmer-animation {
                    animation: shimmer 2s infinite ease-in-out;
                }
            `}</style>
        </section>
    )
}

export default Work