/** @type { import('@storybook/react').Preview } */
import { withTests } from '@storybook/addon-jest';
import results from '../.jest-test-results.json';
// pull in our uswds dependencies
import "../node_modules/@uswds/uswds/dist/js/uswds.js";
import "../node_modules/@uswds/uswds/dist/css/uswds.css";

export const decorators = [
  withTests({
    results,
  }),
];

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
