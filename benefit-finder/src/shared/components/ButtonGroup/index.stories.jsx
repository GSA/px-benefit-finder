import ButtonGroup from './index.jsx'

export default {
  component: ButtonGroup,
  tags: ['autodocs'],
  args: {
    buttonOne: {
      secondary: true,
      children: 'Back',
      onClick: () => alert('navigate back'),
    },
    buttonTwo: {
      children: 'Continue',
      onClick: () => alert('navigate forward'),
    },
  },
}

export const Primary = {}
