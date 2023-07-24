import BenefitAccordionGroup from './index.jsx'
import * as DATA from '../../api/mock-data/content-data.json'

const data = [DATA.benefits[0], DATA.benefits[0]]
const entryKey = Object.keys(data[0])

export default {
  component: BenefitAccordionGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    data,
    entryKey: entryKey[0],
  },
}

export const Primary = {}

export const ExpandAll = {
  args: {
    ...Primary.args,
    expandAll: true,
  },
}
