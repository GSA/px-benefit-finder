import Select from './index.jsx'

const selectLabel = 'Dropdown Label'
const selectOptions = [
  { value: '', label: '-Select-' },
  { value: 'value-1', label: 'Option 1' },
  { value: 'value-2', label: 'Option 2' },
  { value: 'value-3', label: 'Option 3' },
]

export default {
  component: Select,
}

export const Primary = {
  render: () => (
    <Select label={selectLabel} options={selectOptions} htmlFor="options" />
  ),
}
