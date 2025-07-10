import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <section id="about" className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-chakra text-portfolio-700 mb-8 sm:mb-12 md:mb-16'>
          About Me
        </h2>
        
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24'>
          {/* Text Content */}
          <div className='w-full lg:w-1/2 order-2 lg:order-1'>
            <p className='text-sm sm:text-base md:text-lg font-kanit text-portfolio-600 leading-relaxed sm:leading-loose text-justify'>
              Hey There 👋! I am Manish Gupta, a Passionate Software Engineer and doing coding since 2018 and always into finding new ideas and solve it with the help programming, making me more lazy day by day but if it works why not!
              
              <br className='hidden sm:block' />
              <br className='hidden sm:block' />
              
              I'm an introvert but if you meet me.... spend time with me! you just can't leave (except my ex hahahaha).
              
              <br className='hidden sm:block' />
              <br className='hidden sm:block' />
              
              Being a Melophile i just love music and coding together. Talking further about me programming career i started my journey by learning C++ and did Competitive Programming for around 2 years then just switched to Web Development learning MERN Stack and soon found a Project to work on with DropMyOrder. Made their Website, BackOffice, POS system which manages the whole restaurant chains and their deliveries.{' '}
              
              <a 
                href='https://dropmyorder.com/' 
                className='text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-200' 
                target='_blank'
                rel='noopener noreferrer'
              >
                Check it out
              </a>
            </p>
          </div>

          {/* Image Container with Decorative Elements */}
          <div className='w-full lg:w-1/2 order-1 lg:order-2 relative flex justify-center lg:justify-end'>
            <div className='relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl'>
              {/* Circle Decoration - Top Right */}
              <div className='absolute -top-8 -right-2 sm:-top-10 sm:-right-10 md:-top-12 md:-right-12 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 border-2 border-medium-tan/50 rounded-full -z-10'></div>
              
              {/* Rhombus Decoration - Bottom Left */}
              <div className='absolute -bottom-8 -left-8  w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 -z-10'>
                <div className='w-full h-full border-2 border-medium-tan/50 transform rotate-45'></div>
              </div>

              {/* Main Image */}
              <Image
                src="/about.jpg"
                alt="Manish Gupta - Software Engineer"
                width={600}
                height={600}
                className="w-full h-auto rounded-lg sm:rounded-xl md:rounded-2xl shadow-portfolio-lg hover:shadow-portfolio-xl transition-all duration-300 hover:scale-105 border-4 border-border"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About