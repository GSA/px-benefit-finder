import TextInput from './index.jsx'

export default {
  component: TextInput,
  tags: ['autodocs'],
  args: {
    textarea: false,
  },
}

export const Primary = {}

export const TextArea = {
  args: {
    ...Primary.args,
    textarea: true,
  },
}
