import Fieldset from './index.jsx'
import { TextInput } from '../index'

export default {
  component: Fieldset,
  tags: ['autodocs'],
  args: {
    children: <TextInput label="Text input label" />,
    legend: 'Legend',
    hint: 'Hint',
    required: 'FALSE',
  },
}

export const Primary = {}
export const Required = {
  args: {
    ...Primary.args,
    required: 'TRUE',
  },
}
