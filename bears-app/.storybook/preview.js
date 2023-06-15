/** @type { import('@storybook/react').Preview } */
import "../node_modules/@uswds/uswds/dist/css/uswds.css";
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
