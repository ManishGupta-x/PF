export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'],
    },
    sitemap: 'https://dev.manishgupta.co.in/sitemap.xml',
  }
}