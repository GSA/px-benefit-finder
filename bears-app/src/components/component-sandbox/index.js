import { Button, Form, Select } from '../index'

const selectLabel = 'Dropdown Label'
const selectOptions = [
  { value: '', label: '-Select-' },
  { value: 'value-1', label: 'Option 1' },
  { value: 'value-2', label: 'Option 2' },
  { value: 'value-3', label: 'Option 3' },
]

function ComponentSandbox() {
  return (
    <div>
      <div>Sandbox</div>
      <Button className={'lighter'}>Button</Button>
      <Form>
        <Select label={selectLabel} options={selectOptions} htmlFor="options" />
      </Form>
    </div>
  )
}

export default ComponentSandbox
