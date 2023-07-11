import Radio from './index.jsx'

export default {
  component: Radio,
  tags: ['autodocs'],
  args: {
    label: 'Radio',
    value: 'radio',
    defaultChecked: false,
  },
}

export const Primary = {}

export const DefaultChecked = {
  args: {
    defaultChecked: true,
  },
}
