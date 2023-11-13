import TestRenderer from 'react-test-renderer'
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
    const component = TestRenderer.create(
      <Select label={selectLabel} options={selectOptions} ui={en.select} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
