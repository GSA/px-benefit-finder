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
export const Modal = {
  args: {
    ...Primary.args,
    buttonOne: {
      children: 'Review Your Selection',
      onClick: () => alert('navigate back'),
    },
    buttonTwo: {
      children: 'See Results',
      onClick: () => alert('navigate forward'),
    },
  },
}
