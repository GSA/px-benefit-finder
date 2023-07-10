import TextInput from './index.jsx'

export default {
  component: TextInput,
  tags: ['autodocs'],
  args: {
    id: 'input-type-text',
    label: 'Text input label',
    textarea: false,
  },
}

export const Primary = {}

export const TextArea = {
  args: {
    ...Primary.args,
    id: 'input-type-textarea',
    label: 'Text area label',
    textarea: true,
  },
}
