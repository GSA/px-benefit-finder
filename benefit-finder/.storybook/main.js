const config = {
  staticDirs: ['../themes'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
  ],
  docs: {
    autodocs: 'tag',
  },
  framework: '@storybook/react-vite',
  core: {
    builder: '@storybook/builder-vite',
  },
}
export default config
