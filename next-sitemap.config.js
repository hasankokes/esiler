/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://esiler.com.tr',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/api', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      // `${process.env.SITE_URL || 'https://esiler.com.tr'}/my-custom-sitemap.xml`,
    ],
  },
}
