import Hero from '@/components/Hero'
import React from 'react'

const SmallProjectsPage = () => {
  return (
    <div>
      <Hero />
      <div className='max-w-[90%] mx-auto flex flex-col mt-16'>
        <h2 className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-8 underline'>
          LSB - Stegnography Tool
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-justify '>
          LSB is a steganography tool that I developed to demonstrate the concept of hiding information within images. The tool allows users to embed text messages into image files. It's way we can encrypt data into the
          image and decrypt it back without anyone noticing. The tool works by manipulating the least significant bits of the pixel values in an image, which are typically imperceptible to the human eye. This way, the hidden message can be extracted later without altering the appearance of the image.
          I made this product totally with scripts in linux command line.
        </p>
      </div>
      <div className='max-w-[90%] mx-auto flex flex-col mt-16'>
        <h2 className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-8 underline'>
          Timely - A Auto Scheduler
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-justify '>
          It was a project i made in an hackathon with a good friend of mine. We created a web application where we schedule
        </p>
      </div>
      <div className='max-w-[90%] mx-auto flex flex-col mt-16'>
        <h2 className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-8 underline'>
          Smart Traffic Management System
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-justify '>
          This Smart Traffic Management System represents an innovative approach to urban traffic challenges through the integration of cutting-edge technologies including artificial intelligence, machine learning, and IoT sensors. The system comprises three critical components: real-time accident detection using computer vision and CNN algorithms achieving over 90% accuracy, drowsiness monitoring through biometric sensors and facial recognition technology to prevent fatigue-related incidents, and intelligent traffic simulation for predictive traffic flow optimization. Developed as a Bachelor's project at Maharaja Agrasen Institute of Technology, this comprehensive solution addresses the growing concerns of traffic congestion, road safety, and emergency response times in metropolitan areas. The accident detection module leverages LIDAR sensors and surveillance cameras to instantly identify incidents and notify emergency services, while the drowsiness monitoring system uses eye-tracking and facial expression analysis to alert drivers before dangerous situations occur. The traffic simulation component employs advanced modeling techniques using MATLAB and Python to predict congestion patterns and provide actionable insights for city planners and traffic authorities. This integrated system not only enhances immediate safety through proactive monitoring but also contributes to long-term urban planning by enabling data-driven decisions for traffic infrastructure optimization, ultimately creating safer and more efficient roadways for urban environments.
        </p>
      </div>
      <div className='max-w-[90%] mx-auto flex flex-col mt-16'>
        <h2 className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-chakra text-portfolio-700 mb-8 underline'>
          Telephone Diary in Turbo C++
        </h2>
        <p className='text-sm sm:text-base md:text-lg text-justify '>
          This is a simple telephone diary application developed in Turbo C++. It allows users to store and manage contact information, including names, phone numbers, and addresses. The application provides a user-friendly interface for adding, deleting, and searching for contacts.
          It serves as a basic example of how to handle data structures and file operations in C++. This was one of my first projects in C++ while learning all the Oops Concepts.
        </p>
      </div>
      <div className='border-dark-brown/50 border-b-2 my-12 max-w-[95%] sm:max-w-[90%] mx-auto' />


    </div>
  )
}

export default SmallProjectsPage;