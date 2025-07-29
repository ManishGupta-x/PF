import Hero from '@/components/Hero'
import React from 'react'
import { 
  smallProjectsData, 
  renderProjectTitle, 
  renderProjectImage, 
  renderFooterStars 
} from '@/lib/data' // Adjust the import path as needed

export const metadata = {
  title: 'Small Projects',
  description: 'Collection of Manish Gupta\'s small development projects, coding experiments, and innovative web solutions.',
  openGraph: {
    title: 'Small Projects - Manish Gupta',
    description: 'Development projects and coding experiments.',
    url: 'https://dev.manishgupta.co.in/SmallProjects'
  }
}

const SmallProjectsPage = () => {
  return (
    <div>
      <Hero />
      
      
      <div className={smallProjectsData.layout.headerContainerClasses}>
        <h2 className={smallProjectsData.typography.headerTitleClasses}>
          {smallProjectsData.header.title}
        </h2>
        <p className={smallProjectsData.typography.headerSubtitleClasses}>
          {smallProjectsData.header.subtitle}
        </p>
      </div>

      
      {smallProjectsData.projects.map((project) => (
        <div key={project.id} className={smallProjectsData.layout.projectContainerClasses}>
          
          {renderProjectTitle(project, smallProjectsData.typography.projectTitleClasses)}
          
          
          <p className={smallProjectsData.typography.projectDescriptionClasses}>
            {project.description}
          </p>
          
          
          {renderProjectImage(project, smallProjectsData.layout.imageContainerClasses)}
        </div>
      ))}

      
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