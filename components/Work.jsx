"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import Shimmer from './Shimmer' // Adjust the import path as needed

const Work = () => {
    // State to track image loading status
    const [imageLoaded, setImageLoaded] = useState({
        jarvis1: false,
        jarvis2: false,
        jarvis3: false,
        jarvis4: false,
        dmo1: false,
        dmo2: false,
        backoffice1: false,
        backoffice2: false
    })

    // State to track image error status
    const [imageError, setImageError] = useState({
        jarvis1: false,
        jarvis2: false,
        jarvis3: false,
        jarvis4: false,
        dmo1: false,
        dmo2: false,
        backoffice1: false,
        backoffice2: false
    })

    const handleImageLoad = (imageName) => {
        setImageLoaded(prev => ({ ...prev, [imageName]: true }))
        setImageError(prev => ({ ...prev, [imageName]: false }))
    }

    const handleImageError = (imageName) => {
        setImageError(prev => ({ ...prev, [imageName]: true }))
        setImageLoaded(prev => ({ ...prev, [imageName]: false }))
    }

    return (
        <section id="work" className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-portfolio-50 to-portfolio-100 relative overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-12 sm:mb-16 md:mb-20'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-chakra text-portfolio-700 mb-4 sm:mb-6'>
                        Work Experience
                    </h2>
                    <p className='text-base sm:text-lg md:text-xl text-portfolio-600 max-w-3xl mx-auto font-signika px-4'>
                        Showcasing few of my big projects and roles in software development.
                    </p>
                </div>
            </div>

            <div className='max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col'>
                <div>
                    <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-6 sm:mb-8 underline px-2 sm:px-0'>
                        Jarvis-A Music Streaming Service Application
                    </h2>
                    <p className='text-sm sm:text-base md:text-lg text-justify px-2 sm:px-0 leading-relaxed'>
                        In this Programming world this was my first invention i made out of javascript in 2019 after working on it for around a year to make it stable. I got tempted
                        by seeing the craze of music applications on discord and being a melophile i wanted to make for myself and my "someone" at that point of my life hahaha. As soon as i made it live for the world i got great
                        attractions because i was providing features like filters, playlists etc for free spending my own money on to it. Soon i got out of money and starting using some free services like heroku with fake accounts and temp mails
                        but they caught me and improved their security xD... because i was burning there dynos like anything at that point, like just exploiting there bugs lmao.
                        <br /> <br />
                        Soon Google just striked all the music applications running on discord because of some legal issues the one i got to know was that we are streaming audio without video
                        and that came out againt the policies of youtube, growing Jarvis more was not possible so i just used it to listen to music with my friends and
                        some close ones.
                    </p>
                    <div className='flex flex-col lg:flex-row items-center justify-center gap-4 mt-8'>
                        <div className="relative">
                            {(!imageLoaded.jarvis1 || imageError.jarvis1) && (
                                <Shimmer width={460} height={300} className="mt-8" />
                            )}
                            {!imageError.jarvis1 && (
                                <Image 
                                    src='https://raw.githubusercontent.com/ManishGupta-x/Jarvis/master/Images/image5.png'
                                    alt='Jarvis-A Music Streaming Service Application' 
                                    className={`mt-8 rounded-lg shadow-lg transition-opacity duration-300 ${
                                        imageLoaded.jarvis1 ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                    }`}
                                    width={460}
                                    height={300}
                                    onLoad={() => handleImageLoad('jarvis1')}
                                    onError={() => handleImageError('jarvis1')}
                                />
                            )}
                        </div>
                        <div className="relative">
                            {(!imageLoaded.jarvis2 || imageError.jarvis2) && (
                                <Shimmer width={500} height={300} className="mt-8" />
                            )}
                            {!imageError.jarvis2 && (
                                <Image 
                                    src='https://raw.githubusercontent.com/ManishGupta-x/Jarvis/master/Images/image7.png'
                                    alt='Jarvis-A Music Streaming Service Application' 
                                    className={`mt-8 rounded-lg shadow-lg transition-opacity duration-300 ${
                                        imageLoaded.jarvis2 ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                    }`}
                                    width={500}
                                    height={300}
                                    onLoad={() => handleImageLoad('jarvis2')}
                                    onError={() => handleImageError('jarvis2')}
                                />
                            )}
                        </div>
                    </div>
                    <p className='text-sm sm:text-base md:text-lg text-justify mt-8 sm:mt-12 px-2 sm:px-0 leading-relaxed'>
                        Moving on to the technical part of it, i used discord.js v12 and v13 and used distube <a className='text-blue-600 hover:underline break-words' href='https://distube.js.org/' target='_blank' rel='noopener noreferrer'>documentation</a> for implementing the music features.
                        Utilized MongoDB's free clusters to efficiently store and manage user data and their playlists. Developed and integrated numerous features into the application leveraging this database infrastructure. A visual overview of these features is provided below.
                    </p>
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'>
                        <div className="relative">
                            {(!imageLoaded.jarvis3 || imageError.jarvis3) && (
                                <Shimmer width={300} height={200} className="mt-8" />
                            )}
                            {!imageError.jarvis3 && (
                                <Image 
                                    src='https://raw.githubusercontent.com/ManishGupta-x/Jarvis/refs/heads/master/Images/image3.png'
                                    alt='Jarvis-A Music Streaming Service Application' 
                                    className={`mt-8 rounded-lg shadow-lg transition-opacity duration-300 ${
                                        imageLoaded.jarvis3 ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                    }`}
                                    width={300}
                                    height={200}
                                    onLoad={() => handleImageLoad('jarvis3')}
                                    onError={() => handleImageError('jarvis3')}
                                />
                            )}
                        </div>
                        <div className="relative">
                            {(!imageLoaded.jarvis4 || imageError.jarvis4) && (
                                <Shimmer width={290} height={200} className="mt-8" />
                            )}
                            {!imageError.jarvis4 && (
                                <Image 
                                    src='https://raw.githubusercontent.com/ManishGupta-x/Jarvis/master/Images/image4.png'
                                    alt='Jarvis-A Music Streaming Service Application' 
                                    className={`mt-8 rounded-lg shadow-lg transition-opacity duration-300 ${
                                        imageLoaded.jarvis4 ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                    }`}
                                    width={290}
                                    height={200}
                                    onLoad={() => handleImageLoad('jarvis4')}
                                    onError={() => handleImageError('jarvis4')}
                                />
                            )}
                        </div>
                    </div>
                     <span className='font-medium text-brown flex justify-center italic mt-4'>Tech Stack : Discord.js, MongoDB, Node.js</span>
                </div>
            </div>

            <div className='max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col mt-12 sm:mt-16'>
                <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-6 sm:mb-8 underline px-2 sm:px-0'>
                    <a href='https://dropmyorder.com' target='_blank' rel='noopener noreferrer' className='break-words'>dropmyorder.com</a> - Online Food Ordering and Delivery Platform
                </h2>

                <p className='text-sm sm:text-base md:text-lg text-justify px-2 sm:px-0 leading-relaxed'>
                    It was when I got my first client, who believed in me and gave me work to build their website. They were running a restaurant chain in Shimla, Himachal Pradesh.
                    Their CTO Mr. Vanesh Trikha constantly believed in me and guided me to build the front end of the website. As a freshman, I was not aware of the complexities of
                    building a production-level website, but I learned with time how to make it secure, scalable, and responsive.

                    <br /> <br />
                    I used React to build the frontend of the website and learned the dynamics of a React project structure and
                    how to make components reusable and provide a readable file structure to anyone who would come to maintain it in the future.
                    I came across a lot of challenges, like loading the data as fast as possible on the landing page and giving users a seamless experience.
                    As it was important for people living in Shimla without high-speed internet, loading the website fast was a challenge.
                </p>

                <div className='flex flex-col lg:flex-row items-center justify-center gap-4 mt-8'>
                    <div className="relative">
                        {(!imageLoaded.dmo1 || imageError.dmo1) && (
                            <Shimmer width={500} height={200} className="mt-8" />
                        )}
                        {!imageError.dmo1 && (
                            <Image 
                                src='https://cdn.discordapp.com/attachments/730714810614022228/1392492843607658637/image.png?ex=686fbb85&is=686e6a05&hm=1104221441b58974bc234f4fae6b993877e6ea9fbc2796b2d580f10b7e0caf38&'
                                alt='Dropmyorder1' 
                                className={`mt-8 rounded-lg shadow-lg transition-opacity duration-300 ${
                                    imageLoaded.dmo1 ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                }`}
                                width={500}
                                height={200}
                                onLoad={() => handleImageLoad('dmo1')}
                                onError={() => handleImageError('dmo1')}
                            />
                        )}
                    </div>
                    <div className="relative">
                        {(!imageLoaded.dmo2 || imageError.dmo2) && (
                            <Shimmer width={500} height={200} className="mt-8" />
                        )}
                        {!imageError.dmo2 && (
                            <Image 
                                src='https://cdn.discordapp.com/attachments/730714810614022228/1392492965485609083/image.png?ex=686fbba2&is=686e6a22&hm=8af0b82eca2e9357ee8de78e0e8ebdb6945ffcb55fe944fe3c409d86e7dae426&'
                                alt='Dropmyorder2' 
                                className={`mt-8 rounded-lg shadow-lg transition-opacity duration-300 ${
                                    imageLoaded.dmo2 ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                }`}
                                width={500}
                                height={200}
                                onLoad={() => handleImageLoad('dmo2')}
                                onError={() => handleImageError('dmo2')}
                            />
                        )}
                    </div>
                </div>
                     <span className='font-medium text-brown flex justify-center italic mt-4'>Tech Stack : Next.js(React + next-pwa), Tailwind CSS, Django, Python, SQL</span>

                <p className='text-sm sm:text-base md:text-lg text-justify mt-8 sm:mt-12 px-2 sm:px-0 leading-relaxed'>
                    If you ever get a chance to visit Shimla and want to order food online feel free to visit <a className='text-blue-600 hover:underline break-words' href='https://dropmyorder.com' target='_blank' rel='noopener noreferrer'>dropmyorder.com</a> and order food from the restaurant of your choice.
                    And if you tell me you ordered from the website being in shimla because u saw it here 😂 i can provide u discounts fr lmao.
                </p>
            </div>

            <div className='max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col mt-12 sm:mt-16'>
                <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-6 sm:mb-8 underline px-2 sm:px-0'>
                    BackOffice and Advanced POS System
                </h2>
                <p className='text-sm sm:text-base md:text-lg text-justify px-2 sm:px-0 leading-relaxed'>
                    For the same client, I was given the task to build a back office and an advanced POS system that would manage the whole restaurant chain and their deliveries.
                    In the Project we had to manage the orders from online, dine-ins, and takeaways. We built a comprehensive POS competitive to Big Companies like PetPooja in India who is serving
                    POS in india for a long time now.

                    <br /> <br />
                    The product is a combination of several integrated software systems that work together in a pipeline to efficiently
                    manage a restaurant chain. It forms a complete ecosystem — starting from the addition of inventory, managing it through racks,
                    packages, and other logistics, to the transportation of packages from warehouses to restaurant outlets.
                    The system ensures proper checks during transfer, updates the outlet's inventory, records consumption, and ultimately tracks sales.
                </p>

                <div className='flex flex-col lg:flex-row items-center justify-center gap-4 mt-8'>
                    <div className="relative">
                        {(!imageLoaded.backoffice1 || imageError.backoffice1) && (
                            <Shimmer width={500} height={200} className="mt-8 border-2 border-border" />
                        )}
                        {!imageError.backoffice1 && (
                            <Image 
                                src='https://cdn.discordapp.com/attachments/730714810614022228/1392502149790830765/image.png?ex=686fc42f&is=686e72af&hm=c108fe63083c97535acc715eaa53aba6b19cee0444edc52a9875378e208bcf09&'
                                alt='BackOffice1' 
                                className={`mt-8 rounded-lg shadow-lg border-2 border-border transition-opacity duration-300 ${
                                    imageLoaded.backoffice1 ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                }`}
                                width={500}
                                height={200}
                                onLoad={() => handleImageLoad('backoffice1')}
                                onError={() => handleImageError('backoffice1')}
                            />
                        )}
                    </div>
                    <div className="relative">
                        {(!imageLoaded.backoffice2 || imageError.backoffice2) && (
                            <Shimmer width={575} height={200} className="mt-8 border-2 border-border" />
                        )}
                        {!imageError.backoffice2 && (
                            <Image 
                                src='https://cdn.discordapp.com/attachments/730714810614022228/1392502076852011068/image.png?ex=686fc41e&is=686e729e&hm=13bb0c117107bfa74704a3deea29ce0d6c1a2aa16e5bff39cc2bd2bebb968a12&'
                                alt='BackOffice2' 
                                className={`mt-8 rounded-lg shadow-lg border-2 border-border transition-opacity duration-300 ${
                                    imageLoaded.backoffice2 ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                                }`}
                                width={575}
                                height={200}
                                onLoad={() => handleImageLoad('backoffice2')}
                                onError={() => handleImageError('backoffice2')}
                            />
                        )}
                    </div>
                </div>
                     <span className='font-medium text-brown flex justify-center italic mt-4'>Tech Stack : Next.js(React + next-pwa), Tailwind CSS, Django, Python, SQL</span>

                <p className='text-sm sm:text-base md:text-lg text-justify mt-8 sm:mt-12 px-2 sm:px-0 leading-relaxed'>
                    This is a brief overview of the project and the technologies powering it. The system is currently approaching the MVP (Minimum Viable Product) stage, after which I plan to publish detailed documentation covering its architecture and functionality.
                </p>
            </div>

            <div className='max-w-[95%] sm:max-w-[90%] mx-auto flex flex-col mt-12 sm:mt-16'>
                <h2 className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-6 sm:mb-8 underline px-2 sm:px-0'>
                    <a href='https://play.omegaindiaworld.win' target='_blank' rel='noopener noreferrer' className='break-words'>OmegaWorld - CSGO Matchmaking Platform</a>
                </h2>
                <p className='text-sm sm:text-base md:text-lg text-justify px-2 sm:px-0 leading-relaxed'>
                    A good friend of mine approached me to bring back CSGO to life again after Valve ( the developer of CSGO) stopped the official servers and supporting the game.
                    He contacted me to build his frontend for the website and i was like why not, ofcourse we all loved to play that game once and considering the current upgraded version of the game
                    CS2 is full of hackers and people are eager to find a non-toxic place to play the game again. 
                    <br /> <br />
                   With the aid of Discord and Steam, we have developed an entire ecosystem that allows players to download and utilize CSGO on our servers.
                   Below is a comprehensive video made by us that explains how to install CSGO and make real money from it.
                </p>
                <div className="flex justify-center items-center mt-8 sm:mt-12 px-2 sm:px-0">
                    <div className="w-full max-w-2xl">
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                src="https://www.youtube.com/embed/F5Un28sxQXY"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                            ></iframe>
                        </div>
                    </div>
                </div>
                     <span className='font-medium text-brown flex justify-center italic mt-4'>Tech Stack : Next.js(React + next-pwa), Tailwind CSS, Django, Python, SQL</span>
                        
                <p className='text-sm sm:text-base md:text-lg text-justify mt-8 sm:mt-12 px-2 sm:px-0 leading-relaxed'>
                    If you are a gamer and loved to play csgo at some point of your life, you should definitely check this out! Here is a <a className='text-blue-600 hover:underline break-words' href='https://www.reddit.com/r/csgolegacy/comments/1lvep9v/csgo_india_why_am_i_rewarding_players_to_play_csgo/' target='_blank' rel='noopener noreferrer'>Reddit Post</a> about us and our website 
                    <a className='text-blue-600 hover:underline break-words' href='https://play.omegaindiaworld.win' target='_blank' rel='noopener noreferrer'> play.omegaindiaworld.win</a> where you can download the game and play with your friends.
                </p>
            </div>

            <div className='text-center mt-12 sm:mt-16 px-4'>
                <h2 className='text-sm sm:text-base md:text-lg text-portfolio-600 font-quantico opacity-85 leading-relaxed'>
                    Apart from these Big Projects, you can checkout my other projects 
                    <a className='text-blue-600 hover:underline ml-2 break-words' href='/SmallProjects'>Here.</a>
                </h2>
            </div>

            <div className='border-border border-b mt-6 max-w-[95%] sm:max-w-[90%] mx-auto'/>
            
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