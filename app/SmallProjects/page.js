import Hero from '@/components/Hero'
import Image from 'next/image';
import React from 'react'
import { 
  smallProjectsData, 
  renderProjectTitle, 
  renderProjectImage, 
  renderFooterStars 
} from './data' // Adjust the import path as needed

const SmallProjectsPage = () => {
  return (
    <div>
      <Hero />
      
      {/* Header Section */}
      <div className={smallProjectsData.layout.headerContainerClasses}>
        <h2 className={smallProjectsData.typography.headerTitleClasses}>
          {smallProjectsData.header.title}
        </h2>
        <p className={smallProjectsData.typography.headerSubtitleClasses}>
          {smallProjectsData.header.subtitle}
        </p>
      </div>

      {/* Projects Section */}
      {smallProjectsData.projects.map((project) => (
        <div key={project.id} className={smallProjectsData.layout.projectContainerClasses}>
          {/* Project Title */}
          {renderProjectTitle(project, smallProjectsData.typography.projectTitleClasses)}
          
          {/* Project Description */}
          <p className={smallProjectsData.typography.projectDescriptionClasses}>
            {project.description}
          </p>
          
          {/* Project Image (if exists) */}
          {renderProjectImage(project, smallProjectsData.layout.imageContainerClasses)}
        </div>
      ))}

      {/* Footer Section */}
      {smallProjectsData.footer.hasBorder && (
        <div className={smallProjectsData.layout.borderClasses} />
      )}
      
      {smallProjectsData.footer.hasStars && 
        renderFooterStars(
          smallProjectsData.footer.starsCount, 
          smallProjectsData.layout.starsContainerClasses
        )
      }
    </div>
  )
}

export default SmallProjectsPage;