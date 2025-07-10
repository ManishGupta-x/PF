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
              Hey there 👋! I&apos;m Manish Gupta — a passionate Software Engineer who&apos;s been coding since 2018. I&apos;ve always been curious about solving problems through code, which might be making me a little lazier every day… but hey, if it works, why not!
              <br /><br />
              I consider myself an ambivert — someone who enjoys both deep solo focus and engaging with the right company .
              <br /><br />
              A melophile at heart, I absolutely love blending music with my coding sessions. My journey began with C++ and Competitive Programming, which I pursued seriously for over two years. Eventually, I shifted gears to Web Development, diving deep into the MERN stack.
              <br /><br />
              One of the most exciting phases of my journey has been working with <a
                href='https://dropmyorder.com/'
                className='text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-200'
                target='_blank'
                rel='noopener noreferrer'
              >
                DropMyOrder
              </a>, where I built their website, back-office dashboard, and a complete POS system — powering restaurant chains and their delivery networks.
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