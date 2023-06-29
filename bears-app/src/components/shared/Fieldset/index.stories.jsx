import Fieldset from './index.jsx'
import { Button } from '../index'

export default {
  component: Fieldset,
  tags: ['autodocs'],
  args: {
    children: <Button>Button</Button>,
    legend: 'Legend',
    hint: 'Hint',
    required: false,
  },
}

export const Primary = {}
export const Required = {
  args: {
    ...Primary.args,
    required: true,
  },
}
