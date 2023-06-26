import Button from './index.jsx'

export default {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
}

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
