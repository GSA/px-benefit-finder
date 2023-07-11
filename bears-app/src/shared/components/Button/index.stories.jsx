import Button from './index.jsx'

export default {
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button Text',
    disabled: false,
    secondary: false,
    type: 'button',
  },
}

export const Default = {}

export const Primary = {
  args: {
    children: 'Button',
  },
}

export const Secondary = {
  args: {
    ...Primary.args,
    secondary: true,
  },
}
