/** @type { import('@storybook/react').Preview } */
import { withTests } from '@storybook/addon-jest'
import results from '../.jest-test-results.json'
// pull in our uswds dependencies
import '../node_modules/@uswds/uswds/dist/js/uswds.js'
import '../node_modules/@uswds/uswds/dist/css/uswds.css'
import '../themes/custom/usagov/css/styles.css'
import '../build/static/css/benefit-finder.min.css'

const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '320px',
      height: '963px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '1039px',
      height: '963px',
    },
  },
}

export const decorators = [
  withTests({
    results,
  }),
  (Story) => (
      <div id="benefit-finder">
        <Story />
      </div>
    ),
]

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: customViewports,
      defaultViewport: 'mobile',
    },
  },
}

export default preview
