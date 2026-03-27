/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://esilertriko.com',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/api', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      // `${process.env.SITE_URL || 'https://esilertriko.com'}/my-custom-sitemap.xml`,
    ],
  },
}
