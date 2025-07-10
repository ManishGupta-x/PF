import Hero from '@/components/Hero'
import Image from 'next/image';
import React from 'react'

const SmallProjectsPage = () => {
  return (
    <div>
      <Hero />
      <div className='text-center my-12 sm:my-16 md:my-20'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-chakra text-portfolio-700 mb-4 sm:mb-6'>
          Small Projects
        </h2>
        <p className='text-base sm:text-lg md:text-xl text-portfolio-600 max-w-3xl mx-auto font-signika px-4'>
          Showcasing few of my small projects .
        </p>
      </div>
      <div className='max-w-[90%] mx-auto flex flex-col mt-16'>
        <h2 className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-8 underline'>
          <a
            href='https://github.com/ManishGupta-x/Image_steganography'
            target='_blank'
            rel='noopener noreferrer'
          >
            LSB - Image Stegnography Tool
          </a>
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-justify '>
          LSB is a steganography tool that I developed to demonstrate the concept of hiding information within images. The tool allows users to embed text messages into image files. It&apos;s way we can encrypt data into the
          image and decrypt it back without anyone noticing. The tool works by manipulating the least significant bits of the pixel values in an image, which are typically imperceptible to the human eye. This way, the hidden message can be extracted later without altering the appearance of the image.
          I made this product totally with scripts in linux command line.
        </p>
        <div className='flex justify-center mt-8'>
          <Image src='https://cdn.discordapp.com/attachments/730714810614022228/1392889023218843730/hidden_data-01.png?ex=68712c7d&is=686fdafd&hm=7c81ae70b499f14a7a4a7e0ee16651d23d193808284c9a391627f2b0373decd6&' alt='LSB Steganography Tool' width={500} height={300} />
        </div>
      </div>
      <div className='max-w-[90%] mx-auto flex flex-col mt-16'>
        <h2 className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-8 underline'>
          Timely - A Auto Scheduler
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-justify '>
          It was a project i made in an hackathon with a good friend of mine. We created a web application where were we took help of Bard AI to Schedule and Plan our tasks effectively onto the weekdays and weekends. Depending upon various factors
          like the difficulty of the task, the time required to complete it, and the priority level, the AI would suggest an optimal schedule for the user. This project was a great learning experience in integrating AI with web development and understanding user needs for productivity tools.
          We Submitted this project in a hackathon which resulted in us winning the consolation prize.
        </p>
        <div className='flex justify-center mt-8'>
          <Image src='https://cdn.discordapp.com/attachments/730714810614022228/1392888880130298067/image.png?ex=68712c5b&is=686fdadb&hm=02f643deef691049977703f4089349c5f37d477438011ac9ced23f0eacc29c27&' alt='Timely - A Auto Scheduler' width={500} height={300} />
        </div>
      </div>
      <div className='max-w-[90%] mx-auto flex flex-col mt-16'>
        <h2 className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-8 underline'>
          <a
            href='https://github.com/ManishGupta-x/Smart-Traffic-Management-System'
            target='_blank'
            rel='noopener noreferrer'
          >
            Smart Traffic Management System
          </a>
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-justify '>
          This Smart Traffic Management System represents an innovative approach to urban traffic challenges through the integration of cutting-edge technologies including artificial intelligence, machine learning, and IoT sensors. The system comprises three critical components: real-time accident detection using computer vision and CNN algorithms achieving over 90% accuracy, drowsiness monitoring through biometric sensors and facial recognition technology to prevent fatigue-related incidents, and intelligent traffic simulation for predictive traffic flow optimization. Developed as a Bachelor&apos;s project at Maharaja Agrasen Institute of Technology, this comprehensive solution addresses the growing concerns of traffic congestion, road safety, and emergency response times in metropolitan areas. The accident detection module leverages LIDAR sensors and surveillance cameras to instantly identify incidents and notify emergency services, while the drowsiness monitoring system uses eye-tracking and facial expression analysis to alert drivers before dangerous situations occur. The traffic simulation component employs advanced modeling techniques using MATLAB and Python to predict congestion patterns and provide actionable insights for city planners and traffic authorities. This integrated system not only enhances immediate safety through proactive monitoring but also contributes to long-term urban planning by enabling data-driven decisions for traffic infrastructure optimization, ultimately creating safer and more efficient roadways for urban environments.
        </p>
        <div className='flex justify-center mt-8'>
          <Image src='https://cdn.discordapp.com/attachments/730714810614022228/1392889423682736261/image.png?ex=68712cdd&is=686fdb5d&hm=728ac0b644f53124c84aec38948ddc93aeffa2a241544d3624c039b78f386248&' alt='Smart Traffic Management System' width={500} height={300} />
        </div>
      </div>
      <div className='max-w-[90%] mx-auto flex flex-col mt-16'>
        <h2 className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-8 underline'
        >
          <a
            href='https://github.com/ManishGupta-x/telephoneDiary'
            target='_blank'
            rel='noopener noreferrer'
          >
            Telephone Diary in Turbo C++ </a>
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-justify '>
          This is a simple telephone diary application developed in Turbo C++. It allows users to store and manage contact information, including names, phone numbers, and addresses. The application provides a user-friendly interface for adding, deleting, and searching for contacts.
          It serves as a basic example of how to handle data structures and file operations in C++. This was one of my first projects in C++ while learning all the Oops Concepts.
        </p>
      </div>
      <div className='border-dark-brown/50 border-b-2 mt-12 max-w-[95%] sm:max-w-[90%] mx-auto' />
      <div className='flex justify-center items-center space-x-2 text-portfolio-600 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-signika mt-4'>
        {[...Array(5)].map((_, index) => (
          <span key={index}>**</span>
        ))}
      </div>


    </div>
  )
}

export default SmallProjectsPage;