import Fieldset from './index.jsx'
import { Button } from '../index'

export default {
  component: Fieldset,
  tags: ['autodocs'],
  args: {
    children: <Button>Button</Button>,
    legend: 'Legend',
    hint: 'Hint',
  },
}

export const Primary = {}
