/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.EXAMPLE_URL,
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  generateIndexSitemap: false,
  exclude: ["/server-sitemap.xml", "/404"],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.EXAMPLE_URL}/server-sitemap.xml`],
  },
};
