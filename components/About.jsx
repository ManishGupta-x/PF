import Image from 'next/image'
import React from 'react'
import { aboutData, renderParagraphContent } from '@/lib/data' // Adjust the import path as needed

const About = () => {
  return (
    <section id="about" className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20'>
      <div className={aboutData.layout.containerClasses}>
        <h2 className={aboutData.typography.headerClasses}>
          {aboutData.header.title}
        </h2>
        <div className={aboutData.layout.mainWrapperClasses}>
          {/* Text Content */}
          <div className={aboutData.layout.textContainerClasses}>
            <p className={aboutData.typography.paragraphClasses}>
              {aboutData.content.paragraphs.map((paragraph, index) => (
                <React.Fragment key={index}>
                  {renderParagraphContent(paragraph)}
                  {index < aboutData.content.paragraphs.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
          
          {/* Image Container with Decorative Elements */}
          <div className={aboutData.layout.imageContainerClasses}>
            <div className={aboutData.layout.imageWrapperClasses}>
              {/* Render Decorative Elements */}
              {aboutData.decorations.map((decoration, index) => (
                <div key={index}>
                  {decoration.type === 'circle' && (
                    <div className={decoration.className}></div>
                  )}
                  {decoration.type === 'rhombus' && (
                    <div className={decoration.className}>
                      <div className={decoration.innerClassName}></div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Main Image */}
              <Image
                src={aboutData.image.src}
                alt={aboutData.image.alt}
                width={aboutData.image.width}
                height={aboutData.image.height}
                className={aboutData.image.className}
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