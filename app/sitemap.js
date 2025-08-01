export default function sitemap() {
  const baseUrl = 'https://dev.manishguptaji.co.in'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/GamingCareer`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/SmallProjects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    }
  ]
}