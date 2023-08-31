import Select from './index.jsx'
import * as en from '../../locales/en/en.json'

const selectOptions = [
  { value: 'value-1', label: 'Option 1' },
  { value: 'value-2', label: 'Option 2' },
  { value: 'value-3', label: 'Option 3' },
]

export default {
  component: Select,
  tags: ['autodocs'],
  args: {
    ui: en.select,
    options: selectOptions,
  },
}

export const Primary = {}
