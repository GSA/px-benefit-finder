/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          implementation: require('sass'),
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    //👇 See the table below for the list of supported options
    autodocs: 'tag',
  },
}
export default config
