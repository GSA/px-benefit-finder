import Radio from './index.jsx'

export default {
  component: Radio,
  tags: ['autodocs'],
  args: {
    label: 'Radio',
    value: 'radio',
    checked: false,
  },
}

export const Primary = {}

export const DefaultChecked = {
  args: {
    checked: true,
  },
}
