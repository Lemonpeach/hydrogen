module.exports = {
  title: 'Hydrogen',
  tagline: 'Don\'t waste your time writing Redux and React boilerplate code.',
  url: 'https://hydrogen.lemonpeach.ca',
  favicon: 'img/favicon.ico',
  baseUrl: '/',
  organizationName: 'lemonpeach',
  projectName: 'hydrogen',
  themeConfig: {
    navbar: {
      title: 'Hydrogen',
      logo: {
        alt: 'Hydrogen logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/getting-started/introduction',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/Lemonpeach/hydrogen',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Hydrogen contributors. Powered by Docusaurus.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github')
    },
    sidebarCollapsible: false,
    disableDarkMode: true
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/lemonpeach/hydrogen/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
