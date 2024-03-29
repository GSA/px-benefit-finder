import { render } from '@testing-library/react'
import Select from '../index.jsx'
import * as en from '../../../locales/en/en.json'

const selectLabel = 'Dropdown Label'
const selectOptions = [
  { value: '', label: '-Select-' },
  { value: 'value-1', label: 'Option 1' },
  { value: 'value-2', label: 'Option 2' },
  { value: 'value-3', label: 'Option 3' },
]

describe('Select', () => {
  it('renders a match to the previous snapshot', () => {
    const { asFragment } = render(
      <Select
        label={selectLabel}
        options={selectOptions}
        ui={en.select}
        onChange={() => {}}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
